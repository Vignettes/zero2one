import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    return new Response('Error: Missing webhook secret', {
      status: 500,
    });
  }

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the webhook payload
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error: Invalid webhook payload', {
      status: 400,
    });
  }

  // Handle the webhook event
  const { id, type } = evt;
  
  if (type === 'user.created' || type === 'user.updated') {
    const { id: clerkId, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(' ');
    
    if (!email) {
      return new Response('Error: No email found on user', {
        status: 400,
      });
    }

    await prisma.user.upsert({
      where: { clerkId: clerkId as string },
      update: {
        email,
        name,
      },
      create: {
        clerkId: clerkId as string,
        email,
        name,
      },
    });
  }

  if (type === 'user.deleted') {
    const { id: clerkId } = evt.data;
    
    await prisma.user.delete({
      where: { clerkId: clerkId as string },
    });
  }

  return new Response('Webhook received', {
    status: 200,
  });
}
