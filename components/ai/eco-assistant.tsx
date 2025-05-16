"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Sparkles, Lightbulb, RefreshCw, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface EcoAssistantProps {
  userId: string
  userName: string
  footprintData?: any
}

export function EcoAssistant({ userId, userName, footprintData }: EcoAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi ${userName}! I'm your EcoScore AI assistant. Ask me anything about sustainability, reducing your carbon footprint, or how to make eco-friendly choices in your daily life.`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiKeyError, setApiKeyError] = useState(false)
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "How can I reduce my carbon footprint?",
    "What are some easy ways to save energy at home?",
    "How can I reduce food waste?",
    "What are the best sustainable transportation options?",
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    try {
      // Create context about the user's carbon footprint if available
      let context = ""
      if (footprintData) {
        context = `The user's current carbon footprint is ${footprintData.total_footprint} tons CO2e/year, with transportation: ${footprintData.transportation} tons, home energy: ${footprintData.home_energy} tons, food: ${footprintData.food} tons, consumption: ${footprintData.consumption} tons, and travel: ${footprintData.travel} tons.`
      }

      // System prompt for the AI
      const systemPrompt = `You are EcoScore's sustainability assistant, an expert in environmental science, carbon footprints, and sustainable living. 
      Your goal is to help users reduce their environmental impact and live more sustainably.
      Be friendly, encouraging, and provide practical, actionable advice.
      Focus on positive reinforcement and gamification elements to make sustainability fun.
      ${context}
      Keep responses concise (under 150 words) and conversational.`

      // Call our server-side API route instead of directly using the AI SDK
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage,
          systemPrompt: systemPrompt,
          context: context,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate response")
      }

      const data = await response.json()

      // Add assistant response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: data.text }])
      setApiKeyError(false)

      // Generate new suggested questions
      try {
        const suggestionsResponse = await fetch("/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `Based on this conversation, suggest 3 follow-up questions the user might want to ask about sustainability, carbon footprint reduction, or eco-friendly living. Format as a JSON array of strings.
            
            Previous messages:
            ${messages.map((m) => `${m.role}: ${m.content}`).join("\n")}
            User: ${userMessage}
            Assistant: ${data.text}`,
            systemPrompt: "You are a helpful assistant generating follow-up questions about sustainability.",
          }),
        })

        if (suggestionsResponse.ok) {
          const suggestionsData = await suggestionsResponse.json()

          try {
            // Try to parse the suggestions as JSON
            const newSuggestions = JSON.parse(suggestionsData.text)
            if (Array.isArray(newSuggestions) && newSuggestions.length > 0) {
              setSuggestedQuestions(newSuggestions.slice(0, 3))
            }
          } catch (e) {
            // If parsing fails, extract questions using regex
            const questionRegex = /["'](.+?)["']/g
            const matches = [...suggestionsData.text.matchAll(questionRegex)]
            if (matches.length > 0) {
              setSuggestedQuestions(matches.slice(0, 3).map((m) => m[1]))
            }
          }
        }
      } catch (error) {
        // If generating suggestions fails, keep the existing ones
        console.error("Error generating suggestions:", error)
      }
    } catch (error) {
      console.error("Error generating response:", error)

      // Check if it's an API key error
      if (error instanceof Error && (error.message.includes("API key") || error.message.includes("not configured"))) {
        setApiKeyError(true)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm currently unavailable due to a configuration issue. The AI service requires an API key to function. Please contact the administrator to set up the GROQ_API_KEY environment variable.",
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." },
        ])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  // Predefined responses for when API is unavailable
  const getStaticResponse = (query: string): string => {
    const responses: Record<string, string> = {
      "How can I reduce my carbon footprint?":
        "You can reduce your carbon footprint by using public transportation, reducing meat consumption, conserving energy at home, minimizing waste, and choosing sustainable products.",

      "What are some easy ways to save energy at home?":
        "Easy ways to save energy at home include using LED bulbs, unplugging devices when not in use, using a programmable thermostat, washing clothes in cold water, and air-drying clothes when possible.",

      "How can I reduce food waste?":
        "To reduce food waste, plan your meals, make shopping lists, store food properly, use leftovers creatively, compost food scraps, and understand food date labels.",

      "What are the best sustainable transportation options?":
        "Sustainable transportation options include walking, cycling, public transit, carpooling, electric vehicles, and combining trips to reduce overall travel.",

      default:
        "I'm currently in offline mode due to a configuration issue. I can only respond to a few predefined questions. Please try one of the suggested questions below.",
    }

    return responses[query] || responses["default"]
  }

  const handleOfflineSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    // Get static response
    const response = getStaticResponse(userMessage)

    // Simulate delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 500)
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-green-100">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
            <AvatarFallback className="bg-green-600 text-white">
              <Sparkles className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>EcoScore Assistant</CardTitle>
            <CardDescription>Powered by Groq</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        {apiKeyError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Configuration Error</AlertTitle>
            <AlertDescription>
              The AI assistant is currently unavailable due to a missing API key. Please add the GROQ_API_KEY
              environment variable to your Vercel project. The assistant will operate in offline mode with limited
              responses.
            </AlertDescription>
          </Alert>
        )}
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user" ? "bg-green-600 text-white" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-2">
        <div className="flex flex-wrap gap-2 w-full">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleSuggestedQuestion(question)}
            >
              <Lightbulb className="h-3 w-3 mr-1" />
              {question}
            </Button>
          ))}
        </div>
        <form onSubmit={apiKeyError ? handleOfflineSubmit : handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Ask about sustainability..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="bg-green-600 hover:bg-green-700">
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
