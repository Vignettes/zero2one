"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowRight, ChevronLeft } from "lucide-react"
import GlitchText from "@/components/glitch-text"

export default function SuccessCriteriaPage({ params }: { params: { id: string } }) {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const successLevels = [
    {
      id: "small",
      title: "Small Win",
      description: "Minimum viable outcome that would still be valuable",
    },
    {
      id: "medium",
      title: "Medium Success",
      description: "Solid achievement that meets core objectives",
    },
    {
      id: "elite",
      title: "Elite Outcome",
      description: "Outstanding results that exceed expectations",
    },
    {
      id: "moonshot",
      title: "Moonshot",
      description: "Ambitious, transformative outcome (stretch goal)",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-600 via-blue-500 to-emerald-400 relative">
      <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <GlitchText className="text-4xl font-bold tracking-tight text-white drop-shadow-glow md:text-5xl">
            How Successful?
          </GlitchText>
          <p className="mt-4 text-xl text-white">Define what success looks like for this project</p>
        </div>

        <Card className="max-w-2xl mx-auto bg-dark-blue/80 backdrop-blur-md border-teal-400/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Choose your success level</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedLevel || ""} onValueChange={setSelectedLevel} className="space-y-4">
              {successLevels.map((level) => (
                <div key={level.id} className="flex items-start space-x-2">
                  <RadioGroupItem value={level.id} id={level.id} className="border-teal-400 border-2 text-white" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor={level.id} className="text-lg font-medium text-white">
                      {level.title}
                    </Label>
                    <p className="text-sm text-white/80">{level.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Link href="/suggested">
                <Button variant="outline" className="border-teal-400 text-white hover:bg-teal-400/20">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Link href={selectedLevel ? `/set-target/${params.id}` : "#"}>
                <Button
                  className="bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-blue-500 hover:to-emerald-400 text-white"
                  disabled={!selectedLevel}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

