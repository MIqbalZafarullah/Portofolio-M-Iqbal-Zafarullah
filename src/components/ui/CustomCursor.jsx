import React, { useRef, useState, useEffect } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      if (glowRef.current) glowRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      const target = e.target;
      const clickable = target.closest('button, a, input, textarea, [role="button"], .interactive-card');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      <div ref={dotRef} className="absolute" style={{ transform: 'translate(-100px, -100px)' }}>
        <div className="w-2.5 h-2.5 bg-black rounded-full shadow-sm" />
      </div>
      <div ref={glowRef} className="absolute" style={{ transform: 'translate(-100px, -100px)' }}>
        <div
          className={`w-8 h-8 rounded-full border-2 border-black/40 transition-all duration-200 ease-out flex items-center justify-center ${
            isHovering ? 'scale-150 bg-yellow-300/40 border-black' : 'scale-100'
          }`}
        />
      </div>
    </div>
  );
};
