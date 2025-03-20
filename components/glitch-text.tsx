"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
}

export default function GlitchText({ children, className, intensity = "medium" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() < (intensity === "high" ? 0.4 : intensity === "medium" ? 0.25 : 0.1)

      if (shouldGlitch) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }, 1500)

    return () => clearInterval(glitchInterval)
  }, [intensity])

  return (
    <span
      className={cn("relative inline-block transition-transform", isGlitching && "glitch-effect", className)}
      data-text={typeof children === "string" ? children : undefined}
      style={{
        textShadow: isGlitching
          ? `0.05em 0 0 rgba(0, 255, 255, 0.75),
             -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
             0.025em 0.05em 0 rgba(0, 0, 255, 0.75)`
          : undefined,
        animation: isGlitching ? "glitch 0.15s infinite" : undefined,
      }}
    >
      {children}
    </span>
  )
}

