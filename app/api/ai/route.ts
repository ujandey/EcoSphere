import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: NextRequest) {
  try {
    const { prompt, systemPrompt, context } = await request.json()

    // Server-side environment variables are always available
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is not configured. Please contact the administrator." },
        { status: 500 },
      )
    }

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant", {
        apiKey: apiKey,
      }),
      prompt: prompt,
      system: systemPrompt,
    })

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error in AI route:", error)
    return NextResponse.json({ error: "Failed to generate AI response. Please try again later." }, { status: 500 })
  }
}
