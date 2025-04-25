
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Quote, Sparkles, Code } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
}

export const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  const modes = [
    { id: 'words', label: 'Words', icon: BookOpen },
    { id: 'time', label: 'Time', icon: Clock },
    { id: 'quote', label: 'Quote', icon: Quote },
    { id: 'zen', label: 'Zen', icon: Sparkles },
    { id: 'code', label: 'Code', icon: Code },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center gap-2 mb-8 flex-wrap"
    >
      {modes.map((mode, index) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.id;
        
        return (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={isActive ? 'default' : 'outline'}
              onClick={() => onModeChange(mode.id)}
              className={`
                flex items-center gap-2 px-6 py-2 transition-all duration-300
                ${isActive 
                  ? 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25 border-none' 
                  : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-accent border border-white/10'}
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
              {mode.label}
              {isActive && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                ></motion.span>
              )}
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
