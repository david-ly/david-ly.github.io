

import { useState } from 'react';
import ColorAccuracy from './ColorAccuracy';
import DeadPixelTest from './DeadPixelTest';
import BrightnessContrast from './BrightnessContrast';
import ScrollingPattern from './ScrollingPattern';

const tests = [
  {
    name: 'Color Accuracy',
    component: ColorAccuracy,
    instructions: 'Observe each color for accuracy and uniformity across the screen.'
  },
  {
    name: 'Dead Pixel Test',
    component: DeadPixelTest,
    instructions: 'Look for any pixels that don\'t change or remain stuck as the pattern changes. Pay attention to both the background color and the crosshatch pattern.'
  },
  {
    name: 'Brightness/Contrast',
    component: BrightnessContrast,
    instructions: 'Check for smooth gradients and clear distinctions between light and dark areas.'
  },
  {
    name: 'Scrolling Pattern',
    component: ScrollingPattern,
    instructions: 'Observe the scrolling bars for smooth motion and color transitions. If you see stuttering, blurring, or color banding, it may indicate issues with your display\'s refresh rate, response time, or color reproduction.'
  }
];

export default function MonitorCalibration() {
  const [cur_test, setCurTest] = useState(0);
  const nextTest = () => setCurTest((cur) => (cur + 1) % tests.length);
  const CurrentTestComponent = tests[cur_test].component;

  return (
    <div className="flex flex-col items-center w-full max-w-full">
      <div className="mb-5">
        <div className="text-3xl w-full font-bold">Monitor Calibration Tool</div>
      </div>

      <div className="w-full">
        <div className="text-center text-lg sm:text-xl font-semibold mx-2">
          {tests[cur_test].name}
        </div>
      </div>

      {/* Fixed height container for instructions */}
      <div className="h-[75px]">
        <p className="text-lg">{tests[cur_test].instructions}</p>
      </div>

      {/* Fixed size container for test component */}
      <div className="w-full h-[500px] border rounded-lg">
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
  );
}
