import React from "react";
import { cn } from "@/utils/tailwind-utils";

interface TooltipProps {
  label: string;
  className?: string;
}

export const NavigationTooltip: React.FC<TooltipProps> = ({
  label,
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute left-18 z-[9999] hidden rounded-md bg-white px-3 py-2 text-nowrap group-hover:block",
        "text-p3 font-regular shadow-nav-tooltip rounded-small border border-neutral-200 text-left text-neutral-800",
        "animate-in fade-in-0 duration-200",
        className,
      )}
    >
      {label}
    </div>
  );
};
