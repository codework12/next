
import React, { useState, useEffect, useCallback } from 'react';
import { TypingInput } from './TypingInput';
import { TypingStats } from './TypingStats';
import { TypingText } from './TypingText';
import { useTyping } from '@/hooks/useTyping';

const TypingGame = () => {
  const {
    text,
    typedText,
    accuracy,
    wpm,
    startTime,
    isFinished,
    handleInput,
    resetGame
  } = useTyping();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-secondary text-text p-8">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10">
          <TypingStats wpm={wpm} accuracy={accuracy} />
          <TypingText text={text} typedText={typedText} />
          <TypingInput 
            onInput={handleInput}
            isFinished={isFinished}
            onReset={resetGame}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingGame;
