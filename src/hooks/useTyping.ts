
import { useState, useEffect, useCallback } from 'react';

const SAMPLE_TEXTS = {
  words: "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do.",
  time: "Time flies like an arrow. Fruit flies like a banana. The best way to predict the future is to invent it.",
  quote: "Be yourself; everyone else is already taken. - Oscar Wilde",
  zen: "Focus on the journey, not the destination. Joy is found not in finishing an activity but in doing it."
};

export const useTyping = () => {
  const [gameMode, setGameMode] = useState('words');
  const [text, setText] = useState(SAMPLE_TEXTS.words);
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setText(SAMPLE_TEXTS[gameMode as keyof typeof SAMPLE_TEXTS]);
    resetGame();
  }, [gameMode]);

  const calculateStats = useCallback(() => {
    if (!startTime) return;
    
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = typedText.trim().split(' ').length;
    const currentWpm = Math.round(wordsTyped / timeElapsed);
    
    const correctChars = typedText.split('').filter((char, index) => char === text[index]).length;
    const currentAccuracy = Math.round((correctChars / typedText.length) * 100) || 100;
    
    setWpm(currentWpm);
    setAccuracy(currentAccuracy);
  }, [startTime, typedText, text]);

  const handleInput = (input: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    
    setTypedText(input);
    calculateStats();
    
    if (input === text) {
      setIsFinished(true);
    }
  };

  const resetGame = () => {
    setTypedText('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
  };

  return {
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
  };
};
