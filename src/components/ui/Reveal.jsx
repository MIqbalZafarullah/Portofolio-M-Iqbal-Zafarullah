import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const Reveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const [ref, isVisible] = useScrollReveal();
  const base = 'transition-all duration-700 ease-out';
  const hidden = {
    up: 'opacity-0 translate-y-10',
    down: 'opacity-0 -translate-y-10',
    left: 'opacity-0 translate-x-10',
    right: 'opacity-0 -translate-x-10',
  }[direction];
  const visible = 'opacity-100 translate-y-0 translate-x-0';

  return (
    <div
      ref={ref}
      className={`${base} ${isVisible ? visible : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

