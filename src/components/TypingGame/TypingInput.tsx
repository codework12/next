
import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CircleArrowRight } from 'lucide-react';

interface TypingInputProps {
  onInput: (input: string) => void;
  isFinished: boolean;
  onReset: () => void;
}

export const TypingInput = ({ onInput, isFinished, onReset }: TypingInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="mt-8">
      {!isFinished ? (
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => onInput(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-text focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          placeholder="Start typing..."
          autoFocus
        />
      ) : (
        <Button
          onClick={onReset}
          className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-4 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          Try Again <CircleArrowRight className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};
