import React from 'react';
import { Meta } from '../domain/interfaces';


interface PaginationProps {
  meta: Meta;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange }) => {

  const { total, page, lastPage } = meta;

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < lastPage) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex justify-between items-center my-4">
      <button
        onClick={handlePrevious}
        className={`px-4 py-2 bg-[#F05A03] text-white rounded-lg ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={page === 1}
      >
        Anterior
      </button>

      <span>
        Página {page} de {lastPage}
      </span>

      <button
        onClick={handleNext}
        className={`px-4 py-2 bg-[#F05A03] text-white rounded-lg ${page === lastPage ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={page === lastPage}
      >
        Siguiente
      </button>
    </div>
  );
};