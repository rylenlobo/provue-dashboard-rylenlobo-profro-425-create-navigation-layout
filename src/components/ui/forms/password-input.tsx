"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/tailwind-utils";
import Image from "next/image";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const PasswordInput = ({ className, error, ...rest }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const disabled =
    rest.value === "" || rest.value === undefined || rest.disabled;

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn(
          "hide-password-toggle pr-10",
          error && "border-error-default focus:ring-error-default",
          className,
        )}
        {...rest}
      />
      <button
        type="button"
        className="absolute top-0 right-0 flex h-full items-center justify-center px-3 py-2 text-neutral-400 hover:text-neutral-600 disabled:text-neutral-200"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? <EyeOpenIcon /> : <EyeClosedIcon />}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </button>

      {/* hides browsers password toggles */}
    </div>
  );
};

const EyeOpenIcon = () => (
  <Image src="/assets/svg/eye.svg" alt="Show password" width={16} height={16} />
);

const EyeClosedIcon = () => (
  <Image
    src="/assets/svg/eye-off.svg"
    alt="Hide password"
    width={16}
    height={16}
  />
);

export { PasswordInput };
