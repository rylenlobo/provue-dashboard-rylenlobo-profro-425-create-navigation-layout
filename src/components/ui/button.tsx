import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/tailwind-utils";

const buttonVariants = cva(
  "rounded-small inline-flex items-center justify-center whitespace-nowrap font-medium transition-all font-regular !text-neutral-50 select-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900 disabled:bg-gray-50 disabled:text-neutral-400 disabled:cursor-default cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
        // secondary:
        //   "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",

        // destructive:
        //   "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        // outline:
        //   "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        // ghost:
        //   "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        // link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        small: "px-4 py-3 text-p3 max-h-[32px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "small",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
