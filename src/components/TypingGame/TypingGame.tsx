
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
import { Globe, Timer, Sparkles, Keyboard, Zap, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TypingGame = () => {
  const {
    text,
    typedText,
    accuracy,
    wpm,
    stats,
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background-secondary text-text p-4 md:p-8 relative overflow-hidden">
      <Scene3D />
      <AudioManager />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <Card className="backdrop-blur-xl bg-black/30 rounded-2xl shadow-2xl border border-accent/20 overflow-hidden">
          <motion.div 
            className="h-1 bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
          />
          
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-purple-300 bg-clip-text text-transparent"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                Next-Gen Typing Challenge
              </motion.h1>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1 bg-white/10 hover:bg-white/20">
                  <Globe className="w-3 h-3" />
                  Pro
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 bg-white/10 hover:bg-white/20">
                  <Keyboard className="w-3 h-3" />
                  Expert
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 bg-white/10 hover:bg-white/20">
                  <Zap className="w-3 h-3" />
                  Speed
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 bg-white/10 hover:bg-white/20">
                  <Timer className="w-3 h-3" />
                  Real-time
                </Badge>
              </div>
            </div>
            
            <ModeSelector currentMode={gameMode} onModeChange={setGameMode} />
            
            <div className="mt-4 mb-6">
              <div className="flex justify-between mb-2 text-sm text-text-secondary">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-white/10" 
                // Apply custom styling to the indicator element
                style={{
                  "--indicator-color": `${progress < 30 ? '#ef4444' : progress < 70 ? '#f59e0b' : '#10b981'}`
                } as React.CSSProperties}
              />
            </div>
            
            <TypingStats 
              wpm={wpm} 
              accuracy={accuracy} 
              stats={startTime ? stats : undefined} 
            />
            
            <TypingText text={text} typedText={typedText} />
            
            <TypingInput 
              onInput={handleInput}
              isFinished={isFinished}
              onReset={resetGame}
            />

            {isFinished && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-6 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-xl border border-accent/30 flex items-center justify-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Star className="w-12 h-12 text-yellow-300 animate-pulse" />
                    <Trophy className="w-6 h-6 text-yellow-500 absolute top-3 left-3" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Impressive Achievement!</h3>
                    <p className="text-text-secondary">You've mastered this challenge with precision and speed!</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <motion.div 
              className="mt-8 text-center text-sm text-text-secondary opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1 }}
            >
              Designed with advanced algorithms to improve your typing speed and accuracy.
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TypingGame;
