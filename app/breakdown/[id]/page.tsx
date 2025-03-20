"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Plus, Save, Trash2 } from "lucide-react"
import GlitchText from "@/components/glitch-text"

export default function BreakdownPage({ params }: { params: { id: string } }) {
  const [chunks, setChunks] = useState([
    {
      id: 1,
      title: "Research Phase",
      description: "Gather information and analyze competitors",
      tasks: [
        { id: 101, content: "Identify top 5 competitors" },
        { id: 102, content: "Analyze market trends" },
      ],
    },
    {
      id: 2,
      title: "Design Phase",
      description: "Create mockups and get feedback",
      tasks: [
        { id: 201, content: "Create wireframes" },
        { id: 202, content: "Design high-fidelity mockups" },
      ],
    },
  ])

  const [newChunkTitle, setNewChunkTitle] = useState("")
  const [newChunkDescription, setNewChunkDescription] = useState("")
  const [activeChunk, setActiveChunk] = useState<number | null>(null)
  const [newTask, setNewTask] = useState("")

  const addChunk = () => {
    if (newChunkTitle.trim()) {
      const newChunk = {
        id: Date.now(),
        title: newChunkTitle,
        description: newChunkDescription,
        tasks: [],
      }
      setChunks([...chunks, newChunk])
      setNewChunkTitle("")
      setNewChunkDescription("")
    }
  }

  const addTask = (chunkId: number) => {
    if (newTask.trim()) {
      setChunks(
        chunks.map((chunk) =>
          chunk.id === chunkId
            ? {
                ...chunk,
                tasks: [...chunk.tasks, { id: Date.now(), content: newTask }],
              }
            : chunk,
        ),
      )
      setNewTask("")
    }
  }

  const removeTask = (chunkId: number, taskId: number) => {
    setChunks(
      chunks.map((chunk) =>
        chunk.id === chunkId
          ? {
              ...chunk,
              tasks: chunk.tasks.filter((task) => task.id !== taskId),
            }
          : chunk,
      ),
    )
  }

  const removeChunk = (chunkId: number) => {
    setChunks(chunks.filter((chunk) => chunk.id !== chunkId))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-600 via-blue-500 to-emerald-400 relative">
      <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <GlitchText className="text-4xl font-bold tracking-tight text-white drop-shadow-glow md:text-5xl">
            Break It Down
          </GlitchText>
          <p className="mt-4 text-xl text-white">Divide your project into manageable chunks</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {chunks.map((chunk) => (
            <Card
              key={chunk.id}
              className="bg-dark-blue/80 backdrop-blur-md border-teal-400/30 hover:shadow-neon transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-white">{chunk.title}</CardTitle>
                    <p className="mt-1 text-sm text-white/80">{chunk.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeChunk(chunk.id)}
                    className="text-white hover:bg-teal-400/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chunk.tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 rounded-md bg-dark-blue/50">
                      <span className="text-white">{task.content}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTask(chunk.id, task.id)}
                        className="w-6 h-6 text-white hover:bg-teal-400/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                {activeChunk === chunk.id ? (
                  <div className="flex gap-2 mt-4">
                    <Input
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="New task..."
                      className="flex-1 bg-dark-blue/50 border-teal-400/50 text-white placeholder:text-white/50"
                      onKeyDown={(e) => e.key === "Enter" && addTask(chunk.id)}
                    />
                    <Button
                      onClick={() => addTask(chunk.id)}
                      className="bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-blue-500 hover:to-emerald-400 text-white"
                    >
                      Add
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setActiveChunk(chunk.id)}
                    className="w-full mt-4 border-teal-400 text-white hover:bg-teal-400/20"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          <Card className="bg-dark-blue/80 backdrop-blur-md border-teal-400/30 border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
              <div className="w-full space-y-4">
                <Input
                  value={newChunkTitle}
                  onChange={(e) => setNewChunkTitle(e.target.value)}
                  placeholder="Chunk title..."
                  className="bg-dark-blue/50 border-teal-400/50 text-white placeholder:text-white/50"
                />
                <Textarea
                  value={newChunkDescription}
                  onChange={(e) => setNewChunkDescription(e.target.value)}
                  placeholder="Brief description..."
                  className="bg-dark-blue/50 border-teal-400/50 text-white placeholder:text-white/50"
                />
                <Button
                  onClick={addChunk}
                  disabled={!newChunkTitle.trim()}
                  className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-blue-500 hover:to-emerald-400 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Chunk
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-8">
          <Link href={`/set-target/${params.id}`}>
            <Button variant="outline" className="mr-4 border-teal-400 text-white hover:bg-teal-400/20">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-blue-500 hover:to-emerald-400 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save & Finish
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

