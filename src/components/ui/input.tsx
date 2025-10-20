// src/components/ui/input.tsx
import * as React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input ref={ref} {...props} className="border rounded px-3 py-2 w-full" />;
});

Input.displayName = "Input";
