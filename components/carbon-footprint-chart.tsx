"use client"

import { useEffect, useRef } from "react"

export function CarbonFootprintChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Mock data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const data = [9.8, 9.5, 9.2, 8.9, 8.7, 8.5, 8.4, 8.3, 8.2, 8.2, 8.1, 8.0]
    const nationalAvg = Array(12).fill(16)

    // Chart dimensions
    const chartWidth = rect.width
    const chartHeight = rect.height - 40 // Leave space for labels
    const padding = { top: 20, right: 20, bottom: 30, left: 40 }
    const innerWidth = chartWidth - padding.left - padding.right
    const innerHeight = chartHeight - padding.top - padding.bottom

    // Scales
    const maxValue = Math.max(...data, ...nationalAvg) * 1.1
    const xScale = innerWidth / (months.length - 1)
    const yScale = innerHeight / maxValue

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, chartHeight - padding.bottom)
    ctx.lineTo(chartWidth - padding.right, chartHeight - padding.bottom)
    ctx.stroke()

    // Draw horizontal grid lines
    const gridLines = 5
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#94a3b8"

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (innerHeight / gridLines) * i
      const value = maxValue - (maxValue / gridLines) * i

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding.left, y)
      ctx.lineTo(chartWidth - padding.right, y)
      ctx.stroke()

      ctx.fillText(value.toFixed(1), padding.left - 5, y)
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    months.forEach((month, i) => {
      const x = padding.left + xScale * i
      ctx.fillText(month, x, chartHeight - padding.bottom + 10)
    })

    // Draw national average line
    ctx.beginPath()
    ctx.strokeStyle = "#94a3b8"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])

    nationalAvg.forEach((value, i) => {
      const x = padding.left + xScale * i
      const y = chartHeight - padding.bottom - value * yScale

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()
    ctx.setLineDash([])

    // Draw data line
    ctx.beginPath()
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 3

    data.forEach((value, i) => {
      const x = padding.left + xScale * i
      const y = chartHeight - padding.bottom - value * yScale

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw data points
    data.forEach((value, i) => {
      const x = padding.left + xScale * i
      const y = chartHeight - padding.bottom - value * yScale

      ctx.beginPath()
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 2
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    })

    // Draw legend
    const legendX = chartWidth - padding.right - 150
    const legendY = padding.top + 10

    // Your footprint
    ctx.beginPath()
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 3
    ctx.moveTo(legendX, legendY)
    ctx.lineTo(legendX + 20, legendY)
    ctx.stroke()

    ctx.beginPath()
    ctx.fillStyle = "#ffffff"
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 2
    ctx.arc(legendX + 10, legendY, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = "#1e293b"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.font = "12px sans-serif"
    ctx.fillText("Your Footprint", legendX + 30, legendY)

    // National average
    ctx.beginPath()
    ctx.strokeStyle = "#94a3b8"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.moveTo(legendX, legendY + 20)
    ctx.lineTo(legendX + 20, legendY + 20)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = "#1e293b"
    ctx.fillText("National Average", legendX + 30, legendY + 20)
  }, [])

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
