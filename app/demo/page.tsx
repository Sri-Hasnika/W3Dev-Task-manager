"use client"

import { TaskList } from "@/components/task-list"
import { TaskGenerator } from "@/components/task-generator"
import { TaskStats } from "@/components/task-stats"
import { DemoLayout } from "@/components/demo-layout"

export default function DemoPage() {
  return (
    <DemoLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to TaskGen Demo!</h1>
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
    </DemoLayout>
  )
}
