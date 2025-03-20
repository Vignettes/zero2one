import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
 
// Create a matcher that matches all paths except static files and api routes
const isPublicPath = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/clerk'
]);
 
export default clerkMiddleware((auth, req) => {
  // Allow public paths
  if (isPublicPath(req)) {
    return;
  }
});
 
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
