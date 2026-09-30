import { motion } from "framer-motion";

export default function WorldMap() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-auto opacity-20"
      aria-hidden="true"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle fill="hsl(var(--foreground))" cx="2" cy="2" r="1.5"></circle>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)"></rect>
      <path d="M 150 80 L 220 60 L 300 90 L 380 70 L 480 110 L 560 140 L 640 160 L 720 190 L 760 220 L 700 280 L 620 320 L 540 380 L 460 400 L 380 390 L 320 350 L 260 300 L 200 240 L 150 180 Z" fill="none" stroke="hsl(var(--primary))" stroke-width="2" opacity="0.5"></path>
      <path d="M 180 100 L 250 80 L 320 110 L 400 90 L 480 120 L 560 150 L 620 170 L 680 200 L 720 230 L 680 270 L 620 300 L 550 340 L 480 370 L 400 380 L 340 360 L 280 320 L 220 270 L 180 220 Z" fill="none" stroke="hsl(var(--secondary))" stroke-width="2" opacity="0.5"></path>
    </svg>
  );
}