import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ActiveCampaigns() {
  const projects = [
    {
      id: 1,
      title: "Website Redesign",
      progress: 65,
      tasks: 8,
      completed: 5,
    },
    {
      id: 2,
      title: "Mobile App Launch",
      progress: 30,
      tasks: 12,
      completed: 4,
    },
  ]

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Link href={`/project/${project.id}`} key={project.id}>
          <Card className="bg-dark-blue/50 border-teal-400/30 backdrop-blur-sm hover:bg-dark-blue/70 transition-all duration-200 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-glitch-noise opacity-5 pointer-events-none"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">{project.title}</CardTitle>
                <Badge className="bg-emerald-400 hover:bg-emerald-500 text-dark-blue font-medium">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-white">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress
                  value={project.progress}
                  className="h-2 bg-dark-blue/50"
                  indicatorClassName="bg-gradient-to-r from-emerald-400 to-teal-500"
                />
                <div className="flex items-center justify-between text-sm text-white">
                  <span>
                    {project.completed}/{project.tasks} tasks completed
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}

      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center text-white">
          <p>No active projects yet</p>
          <p className="text-sm text-white/70">Start a new project to track your progress</p>
        </div>
      )}
    </div>
  )
}

