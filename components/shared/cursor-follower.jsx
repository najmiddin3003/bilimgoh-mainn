"use client";

import { useEffect, useRef } from "react";

export default function PremiumCursor() {
  const glow = useRef(null);
  // const dot = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (!glow.current) return; // 🔥 MUHIM

      const x = e.clientX;
      const y = e.clientY;

      glow.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* glow */}
      <div
        ref={glow}
        className="
        fixed
        w-[400px] h-[400px]
        bg-green-400/20
        blur-[160px]
        rounded-full
        pointer-events-none
        z-40
        transition-transform duration-100
        "
      />

      {/* small dot */}
      {/* <div
        ref={dot}
        className="
        fixed
        w-2 h-2
        bg-green-400
        rounded-full
        pointer-events-none
        z-50
        "
      /> */}
    </>
  );
}
