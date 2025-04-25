
import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CircleArrowRight, Music } from 'lucide-react';

interface TypingInputProps {
  onInput: (input: string) => void;
  isFinished: boolean;
  onReset: () => void;
}

export const TypingInput = ({ onInput, isFinished, onReset }: TypingInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isFinished]);

  return (
    <div className="mt-8">
      {!isFinished ? (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            onChange={(e) => onInput(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-text focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            placeholder="Start typing..."
            autoFocus
          />
          <div className="absolute right-3 top-3 text-text-secondary text-sm">
            Press <kbd className="px-2 py-1 bg-background-secondary rounded text-xs">Tab</kbd> to restart
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="text-xl font-bold text-center text-accent">
            Great job! You've completed the challenge.
          </div>
          <Button
            onClick={onReset}
            className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-4 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            Try Again <CircleArrowRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
