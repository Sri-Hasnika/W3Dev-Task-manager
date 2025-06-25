import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { mockDb } from "@/lib/mock-db"

export async function GET() {
  try {
    const { userId } = await auth()

    // For demo mode, use a default user ID
    const effectiveUserId = userId || "demo-user"

    const stats = mockDb.tasks.getStats(effectiveUserId)

    return NextResponse.json({
      stats,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats", success: false }, { status: 500 })
  }
}
