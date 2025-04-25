
import React from 'react';
import { Star, Timer } from 'lucide-react';

interface TypingStatsProps {
  wpm: number;
  accuracy: number;
}

export const TypingStats = ({ wpm, accuracy }: TypingStatsProps) => {
  return (
    <div className="flex justify-between mb-8">
      <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
        <Timer className="w-5 h-5 text-accent animate-glow" />
        <span className="text-xl font-medium">{wpm} <span className="text-sm text-text-secondary">WPM</span></span>
      </div>
      <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
        <Star className="w-5 h-5 text-accent animate-glow" />
        <span className="text-xl font-medium">{accuracy}% <span className="text-sm text-text-secondary">Accuracy</span></span>
      </div>
    </div>
  );
};
