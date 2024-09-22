import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, message, onClose }) => {

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); 
    onClose(); 
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOutsideClick} 
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-2xl font-bold text-[#F05A03] mb-4 text-center">{ title }</h2>
        <p className="text-gray-700 mb-4 text-center">{ message }</p>
        <div className="flex justify-center">
          <button 
            className="bg-[#F05A03] text-white py-2 px-4 rounded hover:bg-[#F57931] transition duration-300"
            onClick={ onClose }
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
