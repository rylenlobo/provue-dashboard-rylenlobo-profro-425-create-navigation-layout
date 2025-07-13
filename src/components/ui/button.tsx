import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/tailwind-utils";

const buttonVariants = cva(
  "rounded-small inline-flex items-center justify-center whitespace-nowrap font-medium transition-all font-regular text-neutral-50 select-none transition-colors disabled:cursor-default cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900 disabled:bg-gray-50 disabled:text-neutral-400  ",
        secondary:
          "bg-neutral-100  hover:bg-neutral-2000 active:bg-neutral-100 active:border active:border-neutral-400 disabled:bg-neutral-50 disabled:text-neutral-400 text-neutral-black ",
        outline:
          "border border-neutral-black text-neutral-black hover:border-neutral-400 active:border-neutral-400 active:border-2  disabled:border-neutral-300  disabled:text-neutral-300",
        destructive: "bg-error-default text-white ",
        // ghost:
        //   "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        // link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        large: "py-4 px-6 text-p1 max-h-[48px]",
        medium: "py-4 px-5 text-p2 max-h-[40px]",
        small: "py-3 px-4 text-p3 max-h-[32px]",
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
