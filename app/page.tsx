"use client"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TaskList } from "@/components/task-list"
import { TaskGenerator } from "@/components/task-generator"
import { TaskStats } from "@/components/task-stats"
import { User, Sparkles, CheckCircle, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser()

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">TaskGen</h1>
            <p className="text-xl text-gray-600 mb-8">AI-Powered Task Management</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Welcome to TaskGen</CardTitle>
                <CardDescription>Generate and manage your tasks with AI assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Sign in to start generating and managing your personalized tasks.
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Or try the demo version:</p>
                  <Link href="/demo">
                    <Button variant="outline" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Try Demo Mode
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">AI-powered task generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Complete task management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Progress tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Visual analytics</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user.firstName || "User"}!</h1>
          <p className="text-lg text-gray-600">Generate AI-powered tasks and track your progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <TaskGenerator />
            <TaskList />
          </div>
          <div className="space-y-6">
            <TaskStats />
          </div>
        </div>
      </div>
    </div>
  )
}
