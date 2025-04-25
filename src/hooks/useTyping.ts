
import { useState, useEffect, useCallback } from 'react';

// Expanded set of sentences for different categories
const SAMPLE_TEXTS = {
  words: [
    "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do.",
    "A wizard's job is to vex chumps quickly in fog. The five boxing wizards jump quickly.",
    "How vexingly quick daft zebras jump! Pack my box with five dozen liquor jugs."
  ],
  time: [
    "Time flies like an arrow. Fruit flies like a banana. The best way to predict the future is to invent it.",
    "The clock is running. Make the most of today. Time waits for no one. Yesterday is history, tomorrow is a mystery.",
    "Time is a created thing. To say 'I don't have time' is to say 'I don't want to.' Don't count every hour in the day, make every hour in the day count."
  ],
  quote: [
    "Be yourself; everyone else is already taken. - Oscar Wilde",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe. - Albert Einstein",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams. - Dr. Seuss"
  ],
  zen: [
    "Focus on the journey, not the destination. Joy is found not in finishing an activity but in doing it.",
    "The only Zen you find on the tops of mountains is the Zen you bring up there. Peace comes from within.",
    "When you realize nothing is lacking, the whole world belongs to you. The quieter you become, the more you can hear."
  ],
  code: [
    "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }",
    "const quicksort = arr => arr.length <= 1 ? arr : [...quicksort(arr.filter(x => x < arr[0])), arr[0], ...quicksort(arr.filter(x => x > arr[0]))]",
    "useEffect(() => { const handler = setTimeout(() => setTyping(false), 500); return () => clearTimeout(handler); }, [input]);"
  ]
};

interface TypingStats {
  wpm: number;
  accuracy: number;
  time: number;
  keystrokes: number;
  correctKeys: number;
  errorKeys: number;
}

export const useTyping = () => {
  const [gameMode, setGameMode] = useState('words');
  const [text, setText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    time: 0,
    keystrokes: 0,
    correctKeys: 0,
    errorKeys: 0
  });

  // Select a random text based on game mode
  useEffect(() => {
    const textsForMode = SAMPLE_TEXTS[gameMode as keyof typeof SAMPLE_TEXTS];
    const randomText = textsForMode[Math.floor(Math.random() * textsForMode.length)];
    setText(randomText);
    resetGame();
  }, [gameMode]);

  const calculateStats = useCallback(() => {
    if (!startTime) return;
    
    // Calculate time elapsed in minutes
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; 
    
    // Calculate words typed (standard: 5 chars = 1 word)
    const wordCount = typedText.length / 5;
    const currentWpm = Math.round(wordCount / timeElapsed);
    
    // Calculate accuracy
    let correctChars = 0;
    let errorChars = 0;
    
    typedText.split('').forEach((char, index) => {
      if (char === text[index]) {
        correctChars++;
      } else {
        errorChars++;
      }
    });
    
    const totalKeystrokes = correctChars + errorChars;
    const currentAccuracy = totalKeystrokes > 0 
      ? Math.round((correctChars / totalKeystrokes) * 100) 
      : 100;
    
    setWpm(currentWpm || 0);
    setAccuracy(currentAccuracy);
    
    setStats({
      wpm: currentWpm || 0,
      accuracy: currentAccuracy,
      time: Math.round(timeElapsed * 60), // time in seconds
      keystrokes: totalKeystrokes,
      correctKeys: correctChars,
      errorKeys: errorChars
    });
  }, [startTime, typedText, text]);

  useEffect(() => {
    if (startTime && !isFinished) {
      const interval = setInterval(calculateStats, 500);
      return () => clearInterval(interval);
    }
  }, [startTime, calculateStats, isFinished]);

  const handleInput = (input: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    
    setTypedText(input);
    calculateStats();
    
    // Check if completed
    if (input.length >= text.length) {
      setIsFinished(true);
      setEndTime(Date.now());
    }
  };

  const resetGame = () => {
    setTypedText('');
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setStats({
      wpm: 0,
      accuracy: 100,
      time: 0,
      keystrokes: 0,
      correctKeys: 0,
      errorKeys: 0
    });
  };

  return {
    text,
    typedText,
    accuracy,
    wpm,
    stats,
    startTime,
    endTime,
    isFinished,
    gameMode,
    setGameMode,
    handleInput,
    resetGame
  };
};
