import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Zap } from "lucide-react"
import GlitchText from "@/components/glitch-text"

export default function SuggestedPage() {
  const suggestions = [
    {
      id: 1,
      title: "Launch Social Media Campaign",
      description: "Create and schedule content for Instagram, Twitter, and TikTok",
      difficulty: "Medium",
      impact: "High",
    },
    {
      id: 2,
      title: "Redesign Landing Page",
      description: "Update hero section and improve call-to-action buttons",
      difficulty: "Medium",
      impact: "High",
    },
    {
      id: 3,
      title: "Create Email Newsletter",
      description: "Design template and write content for monthly newsletter",
      difficulty: "Low",
      impact: "Medium",
    },
    {
      id: 4,
      title: "Optimize Website Performance",
      description: "Improve page load times and mobile responsiveness",
      difficulty: "High",
      impact: "Medium",
    },
    {
      id: 5,
      title: "Conduct User Interviews",
      description: "Talk to 5 customers about their experience with the product",
      difficulty: "Medium",
      impact: "High",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-600 via-blue-500 to-emerald-400 relative">
      <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-glitch-overlay opacity-5 pointer-events-none"></div>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <GlitchText
            className="text-4xl font-bold tracking-tight text-white drop-shadow-glow md:text-5xl"
            intensity="high"
          >
            Suggested Ideas
          </GlitchText>
          <p className="mt-4 text-xl text-white">Here are your top 5 suggestions based on impact and feasibility</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((suggestion) => (
            <Card
              key={suggestion.id}
              className="overflow-hidden bg-dark-blue/80 backdrop-blur-md border-teal-400/30 hover:shadow-neon transition-all duration-300 relative"
            >
              <div className="absolute inset-0 bg-glitch-noise opacity-5 pointer-events-none"></div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl text-white glitch-text" data-text={suggestion.title}>
                    {suggestion.title}
                  </CardTitle>
                  <div className="flex -space-x-1">
                    {suggestion.impact === "High" && (
                      <Badge className="bg-gradient-to-r from-emerald-400 to-teal-500 text-dark-blue">
                        <Zap className="w-3 h-3 mr-1" /> High Impact
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">{suggestion.description}</p>
                <div className="flex items-center mt-4 space-x-2">
                  <Badge variant="outline" className="text-white border-teal-400/50">
                    {suggestion.difficulty}
                  </Badge>
                  <div className="flex">
                    {Array.from({
                      length: suggestion.impact === "High" ? 3 : suggestion.impact === "Medium" ? 2 : 1,
                    }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-neon-green" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/success-criteria/${suggestion.id}`} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-blue-500 hover:to-emerald-400 text-white">
                    Select
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/">
            <Button variant="outline" className="border-teal-400 text-white hover:bg-teal-400/20">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

