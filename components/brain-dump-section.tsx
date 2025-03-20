"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDown, Edit, Trash2 } from "lucide-react"

type Idea = {
  id: number
  content: string
}

export default function BrainDumpSection() {
  const [ideas, setIdeas] = useState<Idea[]>([
    { id: 1, content: "Create a vaporwave-themed productivity app" },
    { id: 2, content: "Design retro UI components with modern functionality" },
    { id: 3, content: "Implement a simple drag-and-drop interface" },
  ])
  const [newIdea, setNewIdea] = useState("")

  const addIdea = () => {
    if (newIdea.trim()) {
      setIdeas([...ideas, { id: Date.now(), content: newIdea }])
      setNewIdea("")
    }
  }

  const deleteIdea = (id: number) => {
    setIdeas(ideas.filter((idea) => idea.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          placeholder="Enter a new idea..."
          className="bg-dark-blue/50 border-teal-400/50 text-white placeholder:text-white/50"
          onKeyDown={(e) => e.key === "Enter" && addIdea()}
        />
        <Button onClick={addIdea} variant="secondary" className="shrink-0 bg-teal-500 text-white hover:bg-teal-600">
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {ideas.map((idea) => (
          <Card
            key={idea.id}
            className="bg-dark-blue/50 border-teal-400/30 backdrop-blur-sm hover:bg-dark-blue/70 transition-all duration-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-glitch-noise opacity-5 pointer-events-none"></div>
            <CardContent className="flex items-center justify-between p-3">
              <p className="text-white glitch-hover">{idea.content}</p>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="text-white hover:bg-teal-400/20">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-teal-400/20"
                  onClick={() => deleteIdea(idea.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-teal-400/20">
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

