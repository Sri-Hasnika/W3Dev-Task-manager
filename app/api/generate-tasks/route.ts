import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { topic } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }

    // Mock Gemini API response for demonstration
    // In production, you would integrate with the actual Google Gemini API
    const mockTasks = [
      {
        title: `Research ${topic} fundamentals`,
        description: `Study the basic concepts and principles of ${topic} to build a strong foundation.`,
      },
      {
        title: `Find quality ${topic} resources`,
        description: `Identify and bookmark reliable learning materials, tutorials, and documentation for ${topic}.`,
      },
      {
        title: `Practice ${topic} basics`,
        description: `Start with simple exercises and examples to get hands-on experience with ${topic}.`,
      },
      {
        title: `Join ${topic} community`,
        description: `Connect with others learning ${topic} through forums, Discord servers, or local meetups.`,
      },
      {
        title: `Build a ${topic} project`,
        description: `Apply your knowledge by creating a small project that demonstrates your understanding of ${topic}.`,
      },
    ]

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({ tasks: mockTasks })
  } catch (error) {
    console.error("Error generating tasks:", error)
    return NextResponse.json({ error: "Failed to generate tasks" }, { status: 500 })
  }
}
