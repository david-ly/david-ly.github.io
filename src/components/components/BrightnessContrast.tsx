import { useState, useEffect } from "react"

const patterns = [
  { background: "linear-gradient(to right, black, white)", label: "Horizontal Gradient" },
  { background: "linear-gradient(to bottom, black, white)", label: "Vertical Gradient" },
  {
    background: "repeating-linear-gradient(to right, black, black 10%, white 10%, white 20%)",
    label: "Vertical Stripes",
  },
  { background: "repeating-linear-gradient(45deg, #000, #000 10%, #fff 10%, #fff 20%)", label: "Diagonal Stripes" },
  { background: "radial-gradient(circle, white, black)", label: "Radial Gradient" },
  {
    background: "repeating-radial-gradient(circle, black, black 10%, white 10%, white 20%)",
    label: "Concentric Circles",
  },
]

export default function BrightnessContrast() {
  const [currentPattern, setCurrentPattern] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full" style={{ background: patterns[currentPattern].background }} />
      <div className="mt-4 text-lg font-semibold">{patterns[currentPattern].label}</div>
    </div>
  )
}

