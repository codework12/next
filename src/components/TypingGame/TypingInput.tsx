
import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CircleArrowRight, RefreshCw, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Add Tab key handler for reset
    if (e.key === 'Tab') {
      e.preventDefault();
      onReset();
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className="mt-8">
      {!isFinished ? (
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            ref={inputRef}
            type="text"
            onChange={(e) => onInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/5 border border-accent/30 rounded-xl p-6 text-xl text-text focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all shadow-lg"
            placeholder="Start typing..."
            autoFocus
          />
          
          <motion.div 
            className="absolute right-3 top-3 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <kbd className="px-2 py-1 bg-accent/20 rounded text-xs text-accent border border-accent/30">Tab</kbd>
            <span className="text-text-secondary text-xs">to restart</span>
          </motion.div>
          
          <Button
            onClick={onReset}
            className="absolute left-3 top-3 h-8 w-8 rounded-full p-0 bg-background/80 hover:bg-background backdrop-blur-sm border border-white/10"
            size="icon"
          >
            <RefreshCw className="h-4 w-4 text-accent" />
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-4 p-6 rounded-xl bg-accent/10 border border-accent/30">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Trophy className="w-12 h-12 text-yellow-500" />
            </motion.div>
            <div>
              <motion.h3 
                className="text-2xl font-bold text-accent mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Great job!
              </motion.h3>
              <motion.p 
                className="text-text-secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                You've completed the challenge! Try again to improve your score.
              </motion.p>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={onReset}
              className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/25"
            >
              Try Again <CircleArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
