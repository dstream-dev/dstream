import React, { RefObject } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handleClickOutside: () => void
) {
  React.useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
