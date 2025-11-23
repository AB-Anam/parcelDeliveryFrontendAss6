// src/components/ui/use-toast.tsx
import { useState } from "react";
import ReactDOM from "react-dom";

type ToastType = "success" | "error";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: ToastType = "success") => {
    const id = toastId++;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2 rounded shadow ${
            t.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );

  return { toast, ToastContainer };
};
