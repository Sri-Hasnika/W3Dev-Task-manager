"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GeneratedTask {
  title: string
  description: string
}

export function TaskGenerator() {
  const [topic, setTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([])
  const { user } = useUser()
  const { toast } = useToast()

  const generateTasks = async () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic to generate tasks",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate tasks")
      }

      const data = await response.json()
      setGeneratedTasks(data.tasks)
      toast({
        title: "Success",
        description: `Generated ${data.tasks.length} tasks for "${topic}"`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate tasks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const saveTasks = async () => {
    if (generatedTasks.length === 0) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks: generatedTasks.map((task) => ({
            ...task,
            userId: user?.id,
            category: topic,
            completed: false,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save tasks")
      }

      toast({
        title: "Success",
        description: `Saved ${generatedTasks.length} tasks successfully!`,
      })
      setGeneratedTasks([])
      setTopic("")

      // Trigger a refresh of the task list
      window.dispatchEvent(new CustomEvent("tasksUpdated"))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save tasks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          AI Task Generator
        </CardTitle>
        <CardDescription>Enter a topic and let AI generate actionable tasks for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="e.g., Learn Python, Plan a vacation, Start a business..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && generateTasks()}
          />
          <Button onClick={generateTasks} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate
          </Button>
        </div>

        {generatedTasks.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Generated Tasks</h3>
              <Button onClick={saveTasks} disabled={isSaving} size="sm">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save All
              </Button>
            </div>
            <div className="space-y-2">
              {generatedTasks.map((task, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
