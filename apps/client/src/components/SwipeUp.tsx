import React from "react";

interface IProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

const SwipeUp = ({ isOpen, close, children }: IProps) => (
  <main
    // tabIndex={-1}
    className={`fixed overflow-hidden z-[99] h-screen bg-black bg-opacity-70 inset-0 transform ease-in-out ${
      isOpen
        ? "transition-opacity opacity-100 duration-500 translate-y-0"
        : "transition-all delay-150 duration-500 opacity-0 translate-y-full"
    }`}
  >
    <section
      className={`w-full top-[50px] right-0 absolute bg-white rounded-t-lg shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <article
        className="relative flex flex-col overflow-y-scroll"
        style={{
          height: "calc(100vh - 50px)",
        }}
      >
        {children}
      </article>
    </section>
    <section
      className="w-screen h-full cursor-pointer"
      onClick={() => {
        close();
      }}
    />
  </main>
);

export default SwipeUp;
