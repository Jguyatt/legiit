import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const CustomCursor = ({ enabled = true }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(!isMobile());

  useEffect(() => {
    if (!enabled || isMobile()) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e) => {
      if (e.target.closest('a,button,[role="button"],input,label,.cursor-hover')) {
        setHovering(true);
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a,button,[role="button"],input,label,.cursor-hover')) {
        setHovering(false);
      }
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [enabled]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="custom-cursor"
        initial={false}
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: hovering ? 1.5 : 1,
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="fixed top-0 left-0 w-6 h-6 z-[9999] pointer-events-none"
        style={{
          mixBlendMode: 'exclusion',
        }}
      >
        <div className="w-3 h-3 rounded-full bg-orange-500 shadow-lg transition-all duration-150 ease-in-out" />
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomCursor; 