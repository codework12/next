
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Quote, Sparkles } from 'lucide-react';

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
  ];

  return (
    <div className="flex justify-center gap-2 mb-6">
      {modes.map((mode, index) => {
        const Icon = mode.icon;
        return (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button
              variant={currentMode === mode.id ? 'default' : 'outline'}
              onClick={() => onModeChange(mode.id)}
              className={`
                flex items-center gap-2 px-6 py-2 transition-all duration-300
                ${currentMode === mode.id 
                  ? 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25' 
                  : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-accent'}
              `}
            >
              <Icon className="w-4 h-4" />
              {mode.label}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};
