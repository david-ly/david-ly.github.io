import { useEffect, useRef, useState } from 'react';

const COLORS = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta'];

export default function ColorAccuracy() {
  const [cur_color, setCurColor] = useState(0);
  const nextColor = () => setCurColor((cur) => (cur + 1) % COLORS.length);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        nextColor();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const canvas_ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvas_ref.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      render()
    }

    const render = () => {
      if (!canvas || !ctx) return

      ctx.fillStyle = COLORS[cur_color]
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.font = 'bold 3rem sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(COLORS[cur_color], canvas.width / 2, canvas.height / 2)

      ctx.font = 'semibold 1rem sans-serif'
      ctx.fillText('Click OR press [SPACE] to cycle color(s)', canvas.width / 2, canvas.height / 2 + 40)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [cur_color])

  return (
    <div className="w-full h-full select-none">
      <canvas
        ref={canvas_ref}
        className="w-full h-full cursor-pointer"
        onClick={nextColor}
      />
    </div>
  );
}
