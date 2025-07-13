"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/utils/tailwind-utils";
import Image from "next/image";
import { NavigationTooltip } from "./navigation-tooltip";

interface NavigationButtonProps {
  defaultIcon: string;
  to: string;
  label: string;
  className?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  defaultIcon = " ",
  label,
  className,
  to,
}) => {
  return (
    <Link
      href={to}
      className={cn(
        "group relative flex h-16 items-center overflow-visible",
        className,
      )}
    >
      <div className="rounded-small flex items-center justify-center p-3 transition-colors hover:bg-neutral-100">
        <span className="pointer-events-none relative flex h-6 w-6 items-center justify-center">
          <Image
            src={defaultIcon}
            alt={`${label} icon`}
            fill
            className="object-contain"
          />
        </span>
      </div>
      <NavigationTooltip label={label} />
    </Link>
  );
};
