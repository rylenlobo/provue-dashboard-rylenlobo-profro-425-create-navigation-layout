import Image from "next/image";
import React from "react";

interface FormErrorProps {
  message: string;
  showIcon?: boolean;
  className?: string;
}

export const ErrorLine: React.FC<FormErrorProps> = ({
  message,
  showIcon = true,
  className = "",
}) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {showIcon && (
        <Image
          width={16}
          height={16}
          src="assets/svg/circle-alert.svg"
          alt="error"
        />
      )}
      <p className="text-error-default text-p3">{message}</p>
    </div>
  );
};
