
import React from 'react';
import { Star, Timer, Trophy, Zap, KeySquare, Check, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TypingStatsProps {
  wpm: number;
  accuracy: number;
  stats?: {
    keystrokes: number;
    correctKeys: number;
    errorKeys: number;
    time: number;
  };
}

export const TypingStats = ({ wpm, accuracy, stats }: TypingStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg hover:bg-white/10 transition-all"
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
        initial={{ opacity: 0, x: 0, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg hover:bg-white/10 transition-all"
      >
        <div className="bg-accent/20 p-3 rounded-lg">
          <Star className="w-6 h-6 text-accent animate-pulse" />
        </div>
        <div>
          <div className="text-2xl font-bold">{accuracy}%</div>
          <div className="text-sm text-text-secondary">Accuracy</div>
        </div>
      </motion.div>

      {stats && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg hover:bg-white/10 transition-all col-span-2 md:col-span-1"
        >
          <div className="bg-accent/20 p-3 rounded-lg">
            <Timer className="w-6 h-6 text-accent animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.time}s</div>
            <div className="text-sm text-text-secondary">Time</div>
          </div>
        </motion.div>
      )}

      {stats && (
        <>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex items-center gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg hover:bg-white/10 transition-all"
          >
            <div className="bg-accent/20 p-3 rounded-lg">
              <KeySquare className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.keystrokes}</div>
              <div className="text-sm text-text-secondary">Total Keystrokes</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex items-center gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg hover:bg-white/10 transition-all"
          >
            <div className="bg-green-500/20 p-3 rounded-lg">
              <Check className="w-6 h-6 text-green-500 animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.correctKeys}</div>
              <div className="text-sm text-text-secondary">Correct Keys</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex items-center gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg hover:bg-white/10 transition-all"
          >
            <div className="bg-red-500/20 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.errorKeys}</div>
              <div className="text-sm text-text-secondary">Error Keys</div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
