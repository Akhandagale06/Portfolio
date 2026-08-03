import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, { damping: 28, stiffness: 350, mass: 0.1 });
  const dotY = useSpring(rawY, { damping: 28, stiffness: 350, mass: 0.1 });

  const ringX = useSpring(rawX, { damping: 20, stiffness: 180, mass: 0.2 });
  const ringY = useSpring(rawY, { damping: 20, stiffness: 180, mass: 0.2 });

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [rawX, rawY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Magnetic Dot - Topmost Z-Index 9999 */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-purple-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      />

      {/* Trailing Outer Ring - Topmost Z-Index 9999 */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border border-purple-500/50 rounded-full pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          backgroundColor: isHovered ? 'rgba(124, 58, 237, 0.25)' : 'transparent',
          borderColor: isHovered ? 'rgba(6, 182, 212, 0.9)' : 'rgba(168, 85, 247, 0.5)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />
    </>
  );
};
