
import React from 'react';
import { motion } from 'framer-motion';

export const AncientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Desert background with parallax effect */}
      <motion.div 
        animate={{ 
          x: [-5, 5, -5],
          y: [-2, 2, -2]
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
        className="absolute inset-0 bg-[#2A1810] opacity-90"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-300/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-amber-900/20 to-transparent" />
    </div>
  );
};
