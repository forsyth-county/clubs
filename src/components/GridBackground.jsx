import { cn } from "../lib/utils";
import React from "react";

export function GridBackground({ children, className }) {
  return (
    <div
      className={cn(
        "min-h-screen bg-[#0a0a0f] relative w-full overflow-hidden",
        className
      )}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:32px_32px]" />
      {/* Top-left gradient orb */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[128px]" />
      {/* Bottom-right gradient orb */}
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[128px]" />
      {/* Vignette */}
      <div className="absolute pointer-events-none inset-0 bg-[#0a0a0f] [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default GridBackground;
