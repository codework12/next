
import React from 'react';
import { Button } from '@/components/ui/button';

interface ModeSelectorProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
}

export const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  const modes = [
    { id: 'words', label: 'Words' },
    { id: 'time', label: 'Time' },
    { id: 'quote', label: 'Quote' },
    { id: 'zen', label: 'Zen' },
  ];

  return (
    <div className="flex justify-center gap-2 mb-4">
      {modes.map((mode) => (
        <Button
          key={mode.id}
          variant={currentMode === mode.id ? 'default' : 'outline'}
          onClick={() => onModeChange(mode.id)}
          className={`${
            currentMode === mode.id 
              ? 'bg-accent hover:bg-accent-hover text-white' 
              : 'bg-white/5 text-text-secondary hover:bg-white/10'
          } transition-all duration-300`}
        >
          {mode.label}
        </Button>
      ))}
    </div>
  );
};
