
import React from 'react';
import { Star, Timer, Trophy, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface TypingStatsProps {
  wpm: number;
  accuracy: number;
}

export const TypingStats = ({ wpm, accuracy }: TypingStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10"
      >
        <div className="bg-accent/20 p-3 rounded-lg">
          <Zap className="w-6 h-6 text-accent animate-pulse" />
        </div>
        <div>
          <div className="text-2xl font-bold">{wpm}</div>
          <div className="text-sm text-text-secondary">Words per minute</div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10"
      >
        <div className="bg-accent/20 p-3 rounded-lg">
          <Star className="w-6 h-6 text-accent animate-pulse" />
        </div>
        <div>
          <div className="text-2xl font-bold">{accuracy}%</div>
          <div className="text-sm text-text-secondary">Accuracy</div>
        </div>
      </motion.div>
    </div>
  );
};
