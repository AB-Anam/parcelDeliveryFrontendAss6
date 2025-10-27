// src/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && <label className="mb-1 font-medium">{label}</label>}
        <input
          ref={ref}
          {...props}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
);

Input.displayName = "Input"; // for dev tools
export default Input;
