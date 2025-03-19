import {useEffect, useRef} from 'react'

const SCROLL_SPEED = 2 // pixels per frame
const BAR_WIDTH = 10
const BAR_GAP = 2

export default function ScrollingPattern() {
  const canvas_ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvas_ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let anim_frame_id: number
    let offset = 0
    const draw = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const num_bars = Math.floor(canvas.width / (BAR_WIDTH + BAR_GAP))
      for (let i = 0; i < num_bars; i++) {
        ctx.fillStyle = `hsl(${(i * 360) / num_bars}, 100%, 50%)` // hue, saturation, lightness

        const height = Math.sin((i + offset) * 0.1) * 0.5 + 0.5
        ctx.fillRect(
          i * (BAR_WIDTH + BAR_GAP) // x-axis
        , canvas.height // y-axis
        , BAR_WIDTH // width
        , -height * canvas.height // height
        )
      }

      offset += SCROLL_SPEED * 0.05
      anim_frame_id = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(anim_frame_id)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <canvas
        ref={canvas_ref}
        className="w-full h-full"
      />
    </div>
  )
}

/* Toggle direction of scrolling bars */
// const [direction, setDirection] = useState('vertical')

/* Inside draw function */
    // const total_bars = Math.floor(
    //   (direction === 'vertical' ? canvas.width : canvas.height) / (BAR_WIDTH + BAR_GAP)
    // )

    // for (let i = 0; i < total_bars; i++) {
    //   const height = Math.sin((i + offset) * 0.1) * 0.5 + 0.5
    //   ctx.fillStyle = `hsl(${(i * 360) / total_bars}, 100%, 50%)`

    //   if (direction === 'vertical') {
    //     ctx.fillRect(
    //       i * (BAR_WIDTH + BAR_GAP),
    //       canvas.height,
    //       BAR_WIDTH,
    //       -height * canvas.height
    //     )
    //   } else {
    //     ctx.fillRect(
    //       0,
    //       i * (BAR_WIDTH + BAR_GAP),
    //       height * canvas.width,
    //       BAR_WIDTH
    //     )
    //   }
    // }
