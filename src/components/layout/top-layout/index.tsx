import React, { ReactNode } from "react";
import { cn } from "@/utils/tailwind-utils";

// TopLayoutTitle Component
interface TopLayoutTitleProps {
  children: ReactNode | string;
  className?: string;
}
const TopLayoutTitle: React.FC<TopLayoutTitleProps> = ({
  children,
  className,
}) => <h1 className={cn("text-h5 font-bold", className)}>{children}</h1>;

// TopLayoutDescription Component
interface TopLayoutDescriptionProps {
  children: ReactNode | string;
  className?: string;
}
const TopLayoutDescription: React.FC<TopLayoutDescriptionProps> = ({
  children,
  className,
}) => <p className={cn("text-p2 font-regular", className)}>{children}</p>;

// TopLayout Wrapper Component
interface TopLayoutProps {
  children: ReactNode;
  className?: string;
}
const TopLayout: React.FC<TopLayoutProps> = ({ children, className }) => (
  <div className={cn("flex flex-col gap-2", className)}>{children}</div>
);

export { TopLayout, TopLayoutTitle, TopLayoutDescription };
