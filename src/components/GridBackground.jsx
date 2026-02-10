import { cn } from "../lib/utils";
import React from "react";

export function GridBackground({ children, className }) {
  return (
    <div
      className={cn(
        "min-h-screen bg-neutral-950 relative w-full",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute pointer-events-none inset-0 bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default GridBackground;
