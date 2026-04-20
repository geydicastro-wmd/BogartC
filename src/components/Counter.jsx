import { useEffect, useRef, useState } from "react";

export default function Counter({ end, duration = 5000 }) {
  const [count, setCount] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const ref = useRef(null);

  // Detectar viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.disconnect(); // solo una vez
        }
      },
      { threshold: 0.8 } // 50% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animación
  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [startAnimation, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}