import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ paginate, currentPage, itemsPerPage, totalItems }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  
  return (
    <div className="flex justify-center mt-4">
      <button
        className='bg-gray-300 border w-10 h-10 rounded-md'
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className='mx-auto' />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`${currentPage === number ? 'bg-gray-300' : 'bg-white'
            } w-10 h-10 rounded-md border text-gray-700 mx-1`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
      <button
        className='bg-gray-300 border rounded-md w-10 h-10'
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
      >
        <ChevronRight className='mx-auto' />
      </button>
    </div>
  );
};

export default Pagination;
