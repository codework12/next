
import { useState, useEffect, useCallback } from 'react';

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do.";

export const useTyping = () => {
  const [text] = useState(SAMPLE_TEXT);
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);

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
    handleInput,
    resetGame
  };
};
