import { cn } from "@/utils/tailwind-utils";
import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "placeholder:text-p3 text-p3 font-regular rounded-small w-full border border-neutral-200 p-3",
          "transition-[box-shadow] duration-200 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:outline-none",
          error && "border-error-default focus:ring-error-default",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, type InputProps };
