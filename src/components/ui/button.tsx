// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

// ✅ Define button variants
const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    variant: {
      default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
      outline: "border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
      destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-200",
      ghost: "bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-200",
      link: "bg-transparent underline text-blue-500 hover:text-blue-600 focus:ring-transparent",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// ✅ Button props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// ✅ Export the Button component
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

// ✅ Export variants for advanced usage
export { buttonVariants };
