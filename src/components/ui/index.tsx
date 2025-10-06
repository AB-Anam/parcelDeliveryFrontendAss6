import React from "react";
import { Link } from "react-router-dom";

/* ------------------ BUTTON ------------------ */
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition ${className}`}
  >
    {children}
  </button>
);

/* ------------------ INPUT ------------------ */
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
  />
);

/* ------------------ CARD ------------------ */
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div
    {...props}
    className={`bg-white shadow-md rounded-lg border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div {...props} className={`p-6 ${className}`}>
    {children}
  </div>
);

/* ------------------ CONTAINER ------------------ */
export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div {...props} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

/* ------------------ NAVBAR ------------------ */
export const Navbar: React.FC = () => (
  <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
    <Link to="/" className="text-2xl font-bold">
      Parcel App
    </Link>
    <div className="space-x-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/login" className="hover:underline">Login</Link>
      <Link to="/register" className="hover:underline">Register</Link>
    </div>
  </nav>
);

/* ------------------ FOOTER ------------------ */
export const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-6 mt-12 text-center">
    &copy; 2025 Parcel App
  </footer>
);
