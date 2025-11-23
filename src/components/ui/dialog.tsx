// src/components/ui/dialog.tsx
import * as React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white p-6 rounded shadow-lg min-w-[300px] max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <div className="fixed inset-0 bg-black opacity-30" />
    </div>
  );
};
