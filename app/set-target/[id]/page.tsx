"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Plus, Save, Trash2 } from "lucide-react"
import GlitchText from "@/components/glitch-text"

export default function SetTargetPage({ params }: { params: { id: string } }) {
  const [targets, setTargets] = useState([
    { id: 1, content: "" },
    { id: 2, content: "" },
    { id: 3, content: "" },
  ])
  const [notes, setNotes] = useState("")

  const updateTarget = (id: number, content: string) => {
    setTargets(targets.map((target) => (target.id === id ? { ...target, content } : target)))
  }

  const addTarget = () => {
    setTargets([...targets, { id: Date.now(), content: "" }])
  }

  const removeTarget = (id: number) => {
    if (targets.length > 1) {
      setTargets(targets.filter((target) => target.id !== id))
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-600 via-blue-500 to-emerald-400 relative">
      <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <GlitchText className="text-4xl font-bold tracking-tight text-white drop-shadow-glow md:text-5xl">
            Set the Target
          </GlitchText>
          <p className="mt-4 text-xl text-white">Define SMART goals for your project</p>
        </div>

        <Card className="max-w-2xl mx-auto bg-dark-blue/80 backdrop-blur-md border-teal-400/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Project Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {targets.map((target, index) => (
                <div key={target.id} className="flex gap-2">
                  <div className="flex items-center justify-center w-8 h-8 text-lg font-bold text-dark-blue bg-teal-400 rounded-full">
                    {index + 1}
                  </div>
                  <Input
                    value={target.content}
                    onChange={(e) => updateTarget(target.id, e.target.value)}
                    placeholder={`Target ${index + 1}: e.g., Increase website traffic by 20%`}
                    className="flex-1 bg-dark-blue/50 border-teal-400/50 text-white placeholder:text-white/50"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTarget(target.id)}
                    className="text-white hover:bg-teal-400/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={addTarget}
              className="w-full border-teal-400 text-white hover:bg-teal-400/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Target
            </Button>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Additional Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional details or context for your targets..."
                className="min-h-[100px] bg-dark-blue/50 border-teal-400/50 text-white placeholder:text-white/50"
              />
            </div>

            <div className="flex justify-between">
              <Link href={`/success-criteria/${params.id}`}>
                <Button variant="outline" className="border-teal-400 text-white hover:bg-teal-400/20">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Link href={`/breakdown/${params.id}`}>
                <Button className="bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-blue-500 hover:to-emerald-400 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save & Continue
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

