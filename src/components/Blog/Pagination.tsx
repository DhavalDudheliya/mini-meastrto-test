import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageCount, onPageChange }) => {
  if (pageCount <= 1) return null;
  return (
  <div className="flex justify-center mt-6 sm:mt-8 gap-1 sm:gap-2 flex-wrap">
      <button
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#FF77C3] text-black font-bold"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft />
      </button>
      {Array.from({ length: pageCount }, (_, i) => (
        <button
          key={i + 1}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold ${page === i + 1 ? "bg-[#FFD000] text-black" : "bg-yellow-200"}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#FF77C3] text-black font-bold"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
