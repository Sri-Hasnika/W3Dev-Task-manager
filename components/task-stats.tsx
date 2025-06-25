"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react"

interface TaskStats {
  total: number
  completed: number
  pending: number
  categories: { [key: string]: { total: number; completed: number } }
}

export function TaskStats() {
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    categories: {},
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/tasks/stats")
      if (!response.ok) throw new Error("Failed to fetch stats")
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()

    const handleTasksUpdated = () => {
      fetchStats()
    }

    window.addEventListener("tasksUpdated", handleTasksUpdated)
    return () => window.removeEventListener("tasksUpdated", handleTasksUpdated)
  }, [])

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{Math.round(completionRate)}%</div>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </div>
          <Progress value={completionRate} className="h-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{stats.completed} completed</span>
            <span>{stats.pending} pending</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Categories
          </CardTitle>
          <CardDescription>Progress by category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(stats.categories).length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No categories yet</p>
          ) : (
            Object.entries(stats.categories).map(([category, data]) => {
              const categoryRate = data.total > 0 ? (data.completed / data.total) * 100 : 0
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {category}
                    </Badge>
                    <span className="text-xs text-gray-600">
                      {data.completed}/{data.total}
                    </span>
                  </div>
                  <Progress value={categoryRate} className="h-1" />
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
