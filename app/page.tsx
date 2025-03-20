"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, ChevronRight, LogOut } from "lucide-react"
import BrainDumpSection from "@/components/brain-dump-section"
import ActiveCampaigns from "@/components/active-campaigns"
import GlitchText from "@/components/glitch-text"
import { UserButton, useAuth } from "@clerk/nextjs"

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-600 via-blue-500 to-emerald-400 relative">
      <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-glitch-overlay opacity-5 pointer-events-none"></div>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex justify-end mb-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/sign-in">
              <Button variant="outline" className="border-teal-400 text-white hover:bg-teal-400/20">
                Sign In
              </Button>
            </Link>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <GlitchText className="text-5xl font-bold tracking-tight text-white drop-shadow-glow md:text-7xl">
            zero<span className="text-neon-green">2</span>one
          </GlitchText>
          <p className="mt-4 text-xl text-white">Make ideas reality, without the hassle</p>
        </div>

        {isSignedIn ? (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 transition-all duration-300 bg-dark-blue/80 backdrop-blur-md rounded-xl hover:shadow-neon border border-teal-400/30">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">Brain Dump</h2>
                  <Button size="sm" variant="outline" className="border-teal-400 text-white hover:bg-teal-400/20">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New Idea
                  </Button>
                </div>
                <BrainDumpSection />
              </div>

              <div className="p-6 transition-all duration-300 bg-dark-blue/80 backdrop-blur-md rounded-xl hover:shadow-neon border border-teal-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-glitch opacity-5 pointer-events-none"></div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white glitch-text" data-text="Active Projects">
                    Active Projects
                  </h2>
                </div>
                <ActiveCampaigns />
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/suggested">
                <Button className="px-8 py-6 text-lg font-medium transition-all duration-300 bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-blue-500 hover:to-emerald-400 hover:shadow-neon text-white">
                  Get Suggestions
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16">
            <p className="mb-8 text-xl text-white text-center max-w-2xl">
              Transform your ideas into actionable projects with our step-by-step guided process.
              Sign in to get started on your journey from zero to one.
            </p>
            <div className="flex gap-4">
              <Link href="/sign-in">
                <Button className="px-8 py-6 text-lg font-medium transition-all duration-300 bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-blue-500 hover:to-emerald-400 hover:shadow-neon text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" className="px-8 py-6 text-lg font-medium border-teal-400 text-white hover:bg-teal-400/20">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
