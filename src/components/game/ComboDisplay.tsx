
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameSound } from '@/hooks/use-game-sound';

interface ComboDisplayProps {
  combo: number;
}

export const ComboDisplay: React.FC<ComboDisplayProps> = ({ combo }) => {
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const { playCombo } = useGameSound();
  
  useEffect(() => {
    if (combo > 0) {
      setVisible(true);
      setScale(1.2);
      
      if (combo > 1) {
        playCombo();
      }
      
      // Reset scale after animation
      setTimeout(() => setScale(1), 200);
      
      // Hide after delay
      const t = setTimeout(() => setVisible(false), 1000);
      return () => clearTimeout(t);
    }
  }, [combo, playCombo]);

  return (
    <AnimatePresence>
      {visible && combo > 0 && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: scale,
            transition: { 
              type: "spring",
              damping: 12
            }
          }}
          exit={{ y: -20, opacity: 0 }}
          className="fixed top-24 left-1/2 z-20"
          style={{ 
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative text-4xl font-bold text-cyan-400 drop-shadow-lg">
              🔥 Combo x{combo}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
