import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { mockDb } from "@/lib/mock-db"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    // For demo mode, use a default user ID
    const effectiveUserId = userId || "demo-user"

    const taskId = params.id
    const updates = await request.json()

    // Validate that the task exists and belongs to the user
    const existingTask = mockDb.tasks.findById(taskId, effectiveUserId)
    if (!existingTask) {
      return NextResponse.json({ error: "Task not found", success: false }, { status: 404 })
    }

    // Update the task
    const updatedTask = mockDb.tasks.update(taskId, effectiveUserId, updates)

    return NextResponse.json({
      task: updatedTask,
      success: true,
      message: "Task updated successfully",
    })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ error: "Failed to update task", success: false }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    // For demo mode, use a default user ID
    const effectiveUserId = userId || "demo-user"

    const taskId = params.id

    // Validate that the task exists and belongs to the user
    const existingTask = mockDb.tasks.findById(taskId, effectiveUserId)
    if (!existingTask) {
      return NextResponse.json({ error: "Task not found", success: false }, { status: 404 })
    }

    // Delete the task
    const deleted = mockDb.tasks.delete(taskId, effectiveUserId)

    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete task", success: false }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ error: "Failed to delete task", success: false }, { status: 500 })
  }
}
