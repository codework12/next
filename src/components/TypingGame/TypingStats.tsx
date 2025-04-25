
import React from 'react';
import { Star, Timer } from 'lucide-react';

interface TypingStatsProps {
  wpm: number;
  accuracy: number;
}

export const TypingStats = ({ wpm, accuracy }: TypingStatsProps) => {
  return (
    <div className="flex justify-between mb-8">
      <div className="flex items-center gap-2">
        <Timer className="w-5 h-5 text-accent animate-glow" />
        <span className="text-xl font-medium">{wpm} WPM</span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-accent animate-glow" />
        <span className="text-xl font-medium">{accuracy}% Accuracy</span>
      </div>
    </div>
  );
};
