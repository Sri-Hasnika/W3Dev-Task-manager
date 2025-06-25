import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { mockDb } from "@/lib/mock-db"

export async function GET() {
  try {
    const { userId } = await auth()

    // For demo mode, use a default user ID
    const effectiveUserId = userId || "demo-user"

    const tasks = mockDb.tasks.findMany(effectiveUserId)

    return NextResponse.json({
      tasks,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks", success: false }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    // For demo mode, use a default user ID
    const effectiveUserId = userId || "demo-user"

    const body = await request.json()

    if (body.tasks && Array.isArray(body.tasks)) {
      // Creating multiple tasks
      const tasksData = body.tasks.map((task: any) => ({
        userId: effectiveUserId,
        title: task.title,
        description: task.description,
        completed: task.completed || false,
        category: task.category || "General",
      }))

      const newTasks = mockDb.tasks.createMany(tasksData)

      return NextResponse.json({
        tasks: newTasks,
        success: true,
        message: `Created ${newTasks.length} tasks successfully`,
      })
    } else {
      // Creating single task
      const taskData = {
        userId: effectiveUserId,
        title: body.title,
        description: body.description,
        completed: body.completed || false,
        category: body.category || "General",
      }

      const newTask = mockDb.tasks.create(taskData)

      return NextResponse.json({
        task: newTask,
        success: true,
        message: "Task created successfully",
      })
    }
  } catch (error) {
    console.error("Error creating tasks:", error)
    return NextResponse.json({ error: "Failed to create tasks", success: false }, { status: 500 })
  }
}
