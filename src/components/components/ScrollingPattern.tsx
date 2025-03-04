"use client"

import { useState, useEffect, useRef } from "react"

const SCROLL_SPEED = 2 // pixels per frame
const BAR_WIDTH = 10
const BAR_GAP = 2

export default function ScrollingPattern() {
  const [direction, setDirection] = useState<"vertical" | "horizontal">("vertical")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let offset = 0

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const draw = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const totalBars = Math.floor((direction === "vertical" ? canvas.width : canvas.height) / (BAR_WIDTH + BAR_GAP))

      for (let i = 0; i < totalBars; i++) {
        const height = Math.sin((i + offset) * 0.1) * 0.5 + 0.5
        ctx.fillStyle = `hsl(${(i * 360) / totalBars}, 100%, 50%)`

        if (direction === "vertical") {
          ctx.fillRect(i * (BAR_WIDTH + BAR_GAP), canvas.height, BAR_WIDTH, -height * canvas.height)
        } else {
          ctx.fillRect(0, i * (BAR_WIDTH + BAR_GAP), height * canvas.width, BAR_WIDTH)
        }
      }

      offset += SCROLL_SPEED * 0.05
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [direction])

  const toggleDirection = () => {
    setDirection((prev) => (prev === "vertical" ? "horizontal" : "vertical"))
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
      <button
        onClick={toggleDirection}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Toggle Direction ({direction})
      </button>
    </div>
  )
}

