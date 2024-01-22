import React, { useEffect, useRef } from "react";
import tmdbLogo from "../assets/TMDB.png"; // Asumsikan Anda memiliki logo TMDB sebagai gambar lokal

const LoginModal: React.FC<{
  onLogin: () => void;
  onClose: () => void;
}> = ({ onLogin, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Event handler untuk menutup modal jika diklik di luar
  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef?.current?.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    // Menambahkan event listener saat komponen mount
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener saat komponen unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef]);

  return (
    <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white p-6 rounded shadow-lg z-50 text-center"
        ref={modalRef}
      >
        <img src={tmdbLogo} alt="TMDB Logo" className="mx-auto mb-4" />
        <button
          onClick={onLogin}
          className="text-lg text-blue-600 hover:underline"
        >
          Login with TMDB
        </button>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
