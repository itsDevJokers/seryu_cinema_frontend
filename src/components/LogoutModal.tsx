import React, { useEffect, useRef } from "react";

const LogoutModal: React.FC<{ onLogout: () => void; onCancel: () => void }> = ({
  onLogout,
  onCancel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onCancel();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white p-6 rounded shadow-lg z-50 text-center"
        ref={modalRef}
      >
        <h2 className="text-xl font-bold mb-4 text-red-500">
          Are you sure you want to logout?
        </h2>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
        >
          Logout
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
