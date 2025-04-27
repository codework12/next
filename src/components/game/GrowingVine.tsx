
import React from 'react';
import { motion } from 'framer-motion';

interface GrowingVineProps {
  startPosition: { x: number; y: number };
  onGrowthComplete?: () => void;
  era: 'ancient' | 'medieval' | 'future';
}

export const GrowingVine: React.FC<GrowingVineProps> = ({ startPosition, era }) => {
  const getParticleColor = () => {
    switch (era) {
      case 'ancient':
        return 'rgba(155, 135, 245, 0.7)';
      case 'medieval':
        return 'rgba(212, 70, 239, 0.7)';
      case 'future':
        return 'rgba(14, 165, 233, 0.7)';
    }
  };

  return (
    <motion.div
      className="absolute w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg className="w-full h-full">
        <defs>
          <radialGradient id={`starGradient-${startPosition.x}`}>
            <stop offset="0%" stopColor={getParticleColor()} stopOpacity="0.8" />
            <stop offset="100%" stopColor={getParticleColor()} stopOpacity="0" />
          </radialGradient>
          <filter id={`glow-${startPosition.x}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <motion.circle
          cx={startPosition.x}
          cy={startPosition.y}
          r={2}
          fill={`url(#starGradient-${startPosition.x})`}
          filter={`url(#glow-${startPosition.x})`}
          initial={{ 
            scale: 0,
            opacity: 0 
          }}
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0, 1, 0],
            y: startPosition.y - 300
          }}
          transition={{ 
            duration: 3,
            ease: "easeOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      </svg>
    </motion.div>
  );
};
