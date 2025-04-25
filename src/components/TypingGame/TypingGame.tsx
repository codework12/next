
import React, { useState, useEffect } from 'react';
import { TypingInput } from './TypingInput';
import { TypingStats } from './TypingStats';
import { TypingText } from './TypingText';
import { Scene3D } from './Scene3D';
import { AudioManager } from './AudioManager';
import { useTyping } from '@/hooks/useTyping';
import { Progress } from '@/components/ui/progress';
import { ModeSelector } from './ModeSelector';

const TypingGame = () => {
  const {
    text,
    typedText,
    accuracy,
    wpm,
    startTime,
    isFinished,
    gameMode,
    setGameMode,
    handleInput,
    resetGame
  } = useTyping();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (text && typedText) {
      const completionPercentage = (typedText.length / text.length) * 100;
      setProgress(Math.min(completionPercentage, 100));
    }
  }, [typedText, text]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-secondary text-text p-8 relative overflow-hidden">
      <Scene3D />
      <AudioManager />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10">
          <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
            Ultimate Typing Challenge
          </h1>
          
          <ModeSelector currentMode={gameMode} onModeChange={setGameMode} />
          
          <div className="mt-4 mb-6">
            <Progress value={progress} className="h-2" />
          </div>
          
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
