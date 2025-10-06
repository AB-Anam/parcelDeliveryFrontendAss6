import React from "react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex gap-2">
      {pages.map((p) => (
        <button key={p} onClick={() => onPageChange(p)} className={`px-3 py-1 rounded ${p === page ? "bg-gray-800 text-white" : "bg-gray-100"}`}>
          {p}
        </button>
      ))}
    </div>
  );
}
