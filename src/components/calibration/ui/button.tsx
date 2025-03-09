// import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
// import { cva, type VariantProps } from "class-variance-authority"

// import { cn } from "@components/lib/utils"

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground shadow hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2",
//         sm: "h-8 rounded-md px-3 text-xs",
//         lg: "h-10 rounded-md px-8",
//         icon: "h-9 w-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button"
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Button.displayName = "Button"

// ----------------------------------------------

// export { Button, buttonVariants }

// import { useState } from 'react';
// import ColorAccuracy from './ColorAccuracy';
// import DeadPixelTest from './DeadPixelTest';
// import BrightnessContrast from './BrightnessContrast';
// import ScrollingPattern from './ScrollingPattern';


// const tests = [
//   {
//     name: 'Color Accuracy',
//     component: ColorAccuracy,
//     instructions: 'Observe each color for accuracy and uniformity across the screen.'
//   },
//   {
//     name: 'Dead Pixel Test',
//     component: DeadPixelTest,
//     instructions: 'Look for any pixels that don\'t change or remain stuck as the pattern changes. Pay attention to both the background color and the crosshatch pattern.'
//   },
//   {
//     name: 'Brightness/Contrast',
//     component: BrightnessContrast,
//     instructions: 'Check for smooth gradients and clear distinctions between light and dark areas.'
//   },
//   {
//     name: 'Scrolling Pattern',
//     component: ScrollingPattern,
//     instructions: 'Observe the scrolling bars for smooth motion and color transitions. If you see stuttering, blurring, or color banding, it may indicate issues with your display\'s refresh rate, response time, or color reproduction.'
//   }
// ];

// export default function MonitorCalibration() {
//   const [currentTest, setCurrentTest] = useState(0);

//   const nextTest = () => {
//     setCurrentTest((prev) => (prev + 1) % tests.length);
//   };

//   const CurrentTestComponent = tests[currentTest].component;

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-center">
//           Monitor Calibration Tool
//         </h1>
//         <div className="mb-4 text-center flex flex-wrap justify-center items-center">
//           <span className="text-lg sm:text-xl font-semibold mx-2">{tests[currentTest].name}</span>
//           <button onClick={nextTest} className="btn btn-primary m-2">
//             Next
//           </button>
//         </div>
//         <p className="mb-4 text-center text-sm sm:text-base">{tests[currentTest].instructions}</p>
//         <div className="w-full aspect-video border border-gray-300">
//           <CurrentTestComponent />
//         </div>
//       </div>
//     </main>
//   );
// }
