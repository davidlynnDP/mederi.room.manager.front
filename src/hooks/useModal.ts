import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useModal = (redirectPath: string) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
    navigate(redirectPath);
  };

  return { showModal, closeModal, setShowModal };
};
