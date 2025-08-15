import React, { ButtonHTMLAttributes } from "react";
import Loader from "./Loader";
import { cn } from "@/lib/utils";

const Button = ({
  children,
  isLoading,
  isDisabled = false,
  variant = "filled",
  type = "button",
  onClick,
  className,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: "filled" | "outline";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: any;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={cn(
        "btn-pill w-full items-center justify-center flex disabled:cursor-not-allowed",
        variant === "outline" ? "outline-transparent" : "pink",
        className
      )}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default Button;
