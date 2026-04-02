"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "font-semibold transition-colors rounded-[8px] px-6 py-3 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-cooked-amber text-black hover:bg-cooked-amber-light active:bg-cooked-amber-dark",
    secondary:
      "bg-cooked-surface text-cooked-text-primary border border-cooked-border hover:bg-cooked-surface-light",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
