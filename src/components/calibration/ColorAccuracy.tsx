import { useState, useEffect } from 'react';

const colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta'];

export default function ColorAccuracy() {
  const [cur_color, setCurColor] = useState(0);
  const nextColor = () => setCurColor((cur) => (cur + 1) % colors.length);

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

  return (
    <div className="w-full h-full relative select-none">
      <div
        className="w-full h-full absolute flex flex-col items-center justify-center text-3xl cursor-pointer"
        onClick={nextColor}
        style={{
          backgroundColor: colors[cur_color]
        }}
      >
        <span className="mb-20 font-bold">
          {colors[cur_color]}
        </span>
        <span className="text-base font-semibold">
          Click OR press [SPACE] to cycle color(s)
        </span>
      </div>
    </div>
  );
}
