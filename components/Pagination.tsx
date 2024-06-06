import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="flex justify-start">
      <div className="join bg-transparent text-black my-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`join-item btn bg-transparent text-black border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-all duration-400 ${
              page === idx + 1 ? "bg-gray-200" : ""
            }`}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
