import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCounter({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = end / (duration * 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 1000 / 60);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {formatted}{suffix}
    </motion.span>
  );
}
