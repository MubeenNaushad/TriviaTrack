
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
        <button onClick={onClose} className="top-2 right-2 text-lg font-bold text-black ml-72">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
