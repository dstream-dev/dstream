import React from "react";
import { useOnClickOutside } from "../hooks";

interface IProps {
  children: React.ReactNode;
  onClose: () => void;
  refNode: React.RefObject<HTMLDivElement>;
}

function Modal({ children, onClose, refNode }: IProps) {
  useOnClickOutside(refNode, () => {
    onClose();
  });

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 bg-black bg-opacity-50"
    >
      <div className="flex justify-center items-center w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default Modal;
