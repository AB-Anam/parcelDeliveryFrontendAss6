import React from "react";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = "", ...props }) => (
  <button {...props} className={`px-4 py-2 rounded bg-blue-600 text-white hover:opacity-95 ${className}`}>
    {children}
  </button>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = "", ...props }) => (
  <input {...props} className={`w-full p-2 border rounded ${className}`} />
);

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div {...props} className={`bg-white rounded shadow ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div {...props} className={`p-4 ${className}`}>
    {children}
  </div>
);

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div {...props} className={`max-w-6xl mx-auto px-4 ${className}`}>
    {children}
  </div>
);
