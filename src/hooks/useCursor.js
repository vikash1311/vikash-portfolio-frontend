import { useEffect, useRef } from 'react';

export default function useCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot) { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }
    };
    document.addEventListener('mousemove', move);

    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringEl) {
        ringEl.style.left = ring.current.x + 'px';
        ringEl.style.top = ring.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const grow = () => {
      if (dot) dot.style.transform = 'translate(-50%,-50%) scale(2.5)';
      if (ringEl) { ringEl.style.width = '56px'; ringEl.style.height = '56px'; ringEl.style.opacity = '0.3'; }
    };
    const shrink = () => {
      if (dot) dot.style.transform = 'translate(-50%,-50%) scale(1)';
      if (ringEl) { ringEl.style.width = '36px'; ringEl.style.height = '36px'; ringEl.style.opacity = '0.6'; }
    };

    document.querySelectorAll('a,button,.project-card,.skill-card,.ach-card').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { dotRef, ringRef };
}
