
import React, { useState, useEffect } from 'react';
import { TypingInput } from './TypingInput';
import { TypingStats } from './TypingStats';
import { TypingText } from './TypingText';
import { Scene3D } from './Scene3D';
import { AudioManager } from './AudioManager';
import { useTyping } from '@/hooks/useTyping';
import { Progress } from '@/components/ui/progress';
import { ModeSelector } from './ModeSelector';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Timer, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

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
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <Card className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl border border-white/10">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                Ultimate Typing Challenge
              </h1>
              <div className="flex gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  Global
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  Time Attack
                </Badge>
              </div>
            </div>
            
            <ModeSelector currentMode={gameMode} onModeChange={setGameMode} />
            
            <div className="mt-4 mb-6">
              <div className="flex justify-between mb-2 text-sm text-text-secondary">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <TypingStats wpm={wpm} accuracy={accuracy} />
            
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <TypingText text={text} typedText={typedText} />
            </motion.div>
            
            <TypingInput 
              onInput={handleInput}
              isFinished={isFinished}
              onReset={resetGame}
            />

            {isFinished && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-lg font-medium">Amazing job! You've completed the challenge!</span>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TypingGame;
