import { useLayoutEffect, useRef } from 'react';

export default function useWindowMotion(windowId) {
  const frame = useRef(null);
  const motion = useRef(null);
  const previous = useRef(null);

  useLayoutEffect(() => {
    if (previous.current === windowId) return;
    previous.current = windowId;

    const element = frame.current;
    let start = { transform: 'translateY(20px) scale(.98)', opacity: .65 };
    if (motion.current?.playState === 'running') {
      const { transform, opacity } = getComputedStyle(element);
      start = { transform, opacity };
    }
    motion.current?.cancel();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    motion.current = element.animate?.(
      [start, { transform: 'translateY(0) scale(1)', opacity: 1 }],
      { duration: 480, easing: 'cubic-bezier(.2, .8, .23, 1)' },
    );
  }, [windowId]);

  return frame;
}
