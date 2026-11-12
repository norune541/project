import { type HTMLAttributes } from 'react';

import { useInView } from '@/hooks/use-in-view';

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export function Reveal({ children, className = '', delay = 0, style, ...props }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      {...props}
      ref={ref}
      className={`
        transform-gpu transition-[opacity,transform] duration-700 ease-out
        motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none
        ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        ${className}
      `}
      style={{
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
