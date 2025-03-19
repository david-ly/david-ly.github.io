import {useEffect, useState} from 'react'
import {INTERVAL} from '../../config.ts'

const patterns = [
  {background: 'linear-gradient(to right, black, white)', label: 'Horizontal Gradient'}
, {background: 'linear-gradient(to bottom, black, white)', label: 'Vertical Gradient'}
, {background: 'repeating-linear-gradient(to right, black, black 10%, white 10%, white 20%)', label: 'Vertical Stripes'}
, {background: 'repeating-linear-gradient(45deg, #000, #000 10%, #fff 10%, #fff 20%)', label: 'Diagonal Stripes'}
, {background: 'radial-gradient(circle, white, black)', label: 'Radial Gradient'}
, {background: 'repeating-radial-gradient(circle, black, black 10%, white 10%, white 20%)', label: 'Concentric Circles'}
]

export default function BrightnessContrast() {
  const [cur_pattern, setCurrentPattern] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length)
    }, INTERVAL)

    return () => clearInterval(timer)
  }, [])

  const {background, label} = patterns[cur_pattern]
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full" style={{background: background}}></div>
      <div className="mt-4 text-lg font-semibold">{label}</div>
    </div>
  )
}

/* Canvas Patterns */
// const patterns = [
//   { type: 'horizontal', label: 'Horizontal Gradient' }
// , { type: 'vertical', label: 'Vertical Gradient' }
// , { type: 'stripes', label: 'Vertical Stripes' }
// , { type: 'diagonal', label: 'Diagonal Stripes' }
// , { type: 'radial', label: 'Radial Gradient' }
// , { type: 'concentric', label: 'Concentric Circles' }
// ]

/* Canvas useEffect Implementation */
// const canvas_ref = useRef<HTMLCanvasElement>(null)
// useEffect(() => {
//   const canvas = canvas_ref.current
//   if (!canvas) return

//   const ctx = canvas.getContext('2d')
//   if (!ctx) return

//   const resizeCanvas = () => {
//     canvas.width = canvas.clientWidth
//     canvas.height = canvas.clientHeight
//     render()
//   }

//   const render = () => {
//     if (!canvas || !ctx) return

//     const { width, height } = canvas
//     ctx.clearRect(0, 0, width, height)

//    switch (patterns[cur_pattern].type) {
//      case 'horizontal':
//       const horizontal_gradient = ctx.createLinearGradient(0, 0, width, 0)
//       horizontal_gradient.addColorStop(0, 'black')
//       horizontal_gradient.addColorStop(1, 'white')
//       ctx.fillStyle = horizontal_gradient
//       ctx.fillRect(0, 0, width, height)
//       break

//     case 'vertical':
//       const vertical_gradient = ctx.createLinearGradient(0, 0, 0, height)
//       vertical_gradient.addColorStop(0, 'black')
//       vertical_gradient.addColorStop(1, 'white')
//       ctx.fillStyle = vertical_gradient
//       ctx.fillRect(0, 0, width, height)
//       break

//     case 'stripes':
//       const stripe_width = width / 10
//       for (let x = 0; x < width; x += stripe_width * 2) {
//         ctx.fillStyle = 'black'
//         ctx.fillRect(x, 0, stripe_width, height)
//         ctx.fillStyle = 'white'
//         ctx.fillRect(x + stripe_width, 0, stripe_width, height)
//       }
//       break

//     case 'diagonal':
//       const diagonal_width = Math.sqrt(width * width + height * height) / 10
//       for (let i = 0; i < width + height; i += diagonal_width * 2) {
//         ctx.fillStyle = 'black'
//         ctx.beginPath()
//         ctx.moveTo(i, 0)
//         ctx.lineTo(i + diagonal_width, 0)
//         ctx.lineTo(i + diagonal_width - height, height)
//         ctx.lineTo(i - height, height)
//         ctx.closePath()
//         ctx.fill()

//         ctx.fillStyle = 'white'
//         ctx.beginPath()
//         ctx.moveTo(i + diagonal_width, 0)
//         ctx.lineTo(i + diagonal_width * 2, 0)
//         ctx.lineTo(i + diagonal_width * 2 - height, height)
//         ctx.lineTo(i + diagonal_width - height, height)
//         ctx.closePath()
//         ctx.fill()
//       }
//       break

//     case 'radial':
//       const radial_gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2)
//       radial_gradient.addColorStop(0, 'white')
//       radial_gradient.addColorStop(1, 'black')
//       ctx.fillStyle = radial_gradient
//       ctx.fillRect(0, 0, width, height)
//       break

//     case 'concentric':
//       const center_x = width / 2
//       const center_y = height / 2
//       const max_radius = Math.max(width, height) / 2
//       const ring_width = max_radius / 5

//       for (let radius = 0; radius < max_radius; radius += ring_width * 2) {
//         ctx.fillStyle = 'black'
//         ctx.beginPath()
//         ctx.arc(center_x, center_y, radius + ring_width, 0, Math.PI * 2)
//         ctx.arc(center_x, center_y, radius, 0, Math.PI * 2, true)
//         ctx.fill()

//         ctx.fillStyle = 'white'
//         ctx.beginPath()
//         ctx.arc(center_x, center_y, radius + ring_width * 2, 0, Math.PI * 2)
//         ctx.arc(center_x, center_y, radius + ring_width, 0, Math.PI * 2, true)
//         ctx.fill()
//       }
//       break
//   }
// }

//   resizeCanvas()
//   window.addEventListener('resize', resizeCanvas)
//   return () => window.removeEventListener('resize', resizeCanvas)
// }, [cur_pattern])
