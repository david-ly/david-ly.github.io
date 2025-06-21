import {useState} from 'react'
import ColorAccuracy from './ColorAccuracy.tsx'
import DeadPixelTest from './DeadPixelTest.tsx'
import BrightnessContrast from './BrightnessContrast.tsx'
import ScrollingPattern from './ScrollingPattern.tsx'

const tests = [
  {
    name: 'Color Accuracy'
  , component: ColorAccuracy
  , instructions: <>Observe each color for accuracy and uniformity. Click on the color or press <kbd className="px-1 py-1 bg-base-100 border rounded text-white">SPACE</kbd> to cycle through colors.</>
  }
, {
    name: 'Dead Pixel Test'
  , component: DeadPixelTest
  , instructions: 'Look for any pixels in the background/crosshatch that don\'t change or remain stuck as the pattern changes'
  }
, {
    name: 'Brightness/Contrast'
  , component: BrightnessContrast
  , instructions: 'Check for smooth gradients and clear distinctions between light/dark areas.'
  }
, {
    name: 'Scrolling Pattern'
  , component: ScrollingPattern
  , instructions: 'Watch the scrolling bars to monitor for smooth motion and color transitions.'
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

      <div className="text-center text-2xl font-semibold mx-2">
        {tests[cur_test].name}
      </div>

      <div className="w-full mb-2 sm:mb-4 md:mb-6 flex-shrink-0">
        <p className="text-center text-lg">{tests[cur_test].instructions}</p>
      </div>

      <div className="h-[70vh] w-full border rounded-lg mb-4 sm:mb-6 md:mb-8">
        <CurrentTestComponent />
      </div>

      <div className="mt-4 flex-shrink-0">
        <button onClick={nextTest} className="btn btn-outline">
          Next Test
        </button>
      </div>
    </div>
  )
}
