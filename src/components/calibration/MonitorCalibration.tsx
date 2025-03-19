import {useState} from 'react'
import ColorAccuracy from './ColorAccuracy.tsx'
import DeadPixelTest from './DeadPixelTest.tsx'
import BrightnessContrast from './BrightnessContrast.tsx'
import ScrollingPattern from './ScrollingPattern.tsx'

const tests = [
  {
    name: 'Color Accuracy'
  , component: ColorAccuracy
  , instructions: 'Observe each color for accuracy and uniformity.'
  }
, {
    name: 'Dead Pixel Test'
  , component: DeadPixelTest
  , instructions: 'Look for any pixels that don\'t change or remain stuck as the pattern changes. Pay attention to both the background & crosshatch.'
  }
, {
    name: 'Brightness/Contrast'
  , component: BrightnessContrast
  , instructions: 'Check for smooth gradients and clear distinctions between light/dark areas.'
  }
, {
    name: 'Scrolling Pattern'
  , component: ScrollingPattern
  , instructions: 'Observe the scrolling bars for smooth motion and color transitions. If you see stuttering, blurring, or color banding, it may indicate issues with your display\'s refresh rate, response time, or color reproduction.'
  }
]

export default function MonitorCalibration() {
  const [cur_test, setCurTest] = useState(0)
  const nextTest = () => setCurTest((cur) => (cur + 1) % tests.length)
  const CurrentTestComponent = tests[cur_test].component

  return (
    <div className="flex flex-col items-center w-full max-w-full">
      <div className="mb-5">
        <div className="text-3xl w-full font-bold justify-center">Monitor Calibration Tool</div>
      </div>

      <div className="w-full">
        <div className="text-center text-lg sm:text-xl font-semibold mx-2">
          {tests[cur_test].name}
        </div>
      </div>

      <div className="h-[75px] w-full">
        <p className="flex items-center justify-center text-lg">{tests[cur_test].instructions}</p>
      </div>

      <div className="w-full h-[500px] max-w-[1200px] border rounded-lg overflow-hidden">
        <div className="w-full h-full">
          <CurrentTestComponent />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button onClick={nextTest} className="btn btn-outline">
          Next Test
        </button>
      </div>
    </div>
  )
}
