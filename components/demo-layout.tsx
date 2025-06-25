"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, LogOut } from "lucide-react"

interface DemoLayoutProps {
  children: React.ReactNode
}

export function DemoLayout({ children }: DemoLayoutProps) {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [demoUser] = useState({ firstName: "Demo", lastName: "User" })

  if (!isDemoMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome to TaskGen</CardTitle>
            <CardDescription>AI-Powered Task Management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Demo Mode Available</h3>
              <p className="text-sm text-blue-700 mb-3">
                Try the application without setting up authentication. Perfect for testing and exploration.
              </p>
              <Button onClick={() => setIsDemoMode(true)} className="w-full" variant="outline">
                <User className="h-4 w-4 mr-2" />
                Continue as Demo User
              </Button>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">For full functionality, set up Clerk authentication</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TG</span>
            </div>
            <h1 className="text-xl font-bold">TaskGen</h1>
            <Badge variant="secondary" className="ml-2">
              Demo Mode
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hello, {demoUser.firstName}!</span>
            <Button variant="ghost" size="sm" onClick={() => setIsDemoMode(false)}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
