import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Star, Trees, Cloud, TreePine } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { useGameSound } from '@/hooks/use-game-sound';
import { ZenParticles } from './ZenParticles';
import { GrowingVine } from './GrowingVine';
import { useNavigate } from 'react-router-dom';
import { CyberBackButton } from '@/components/ui/CyberBackButton';

interface TimeGardenModeProps {
  onScoreChange: (score: number) => void;
  onWpmChange: (wpm: number) => void;
  onGameOver: () => void;
}

export const TimeGardenMode: React.FC<TimeGardenModeProps> = ({
  onScoreChange,
  onWpmChange,
  onGameOver
}) => {
  // Game state
  const [currentWord, setCurrentWord] = useState('');
  const [typedWord, setTypedWord] = useState('');
  const [gardenEnergy, setGardenEnergy] = useState(0);
  const [plants, setPlants] = useState<any[]>([]);
  const [era, setEra] = useState<'ancient' | 'medieval' | 'future'>('ancient');
  const [wordsTyped, setWordsTyped] = useState(0);
  const [wordsCorrect, setWordsCorrect] = useState(0);
  const [combo, setCombo] = useState(0);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [typingPulse, setTypingPulse] = useState(false);
  const [fadeAnimation, setFadeAnimation] = useState(false);
  const startTime = useRef(Date.now());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [vines, setVines] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [score, setScore] = useState(0);
  const [scoreMultiplier, setScoreMultiplier] = useState(1);
  const [scoreAnimation, setScoreAnimation] = useState(false);
  const [lastScoreIncrease, setLastScoreIncrease] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Word lists for different eras
  const wordLists = {
    ancient: ['nature', 'root', 'seed', 'grow', 'river', 'rock', 'tree', 'leaf', 'soil', 'flora'],
    medieval: ['garden', 'bloom', 'flower', 'sunlight', 'water', 'plant', 'harvest', 'breeze', 'rose', 'vine'],
    future: ['quantum', 'blossom', 'nebula', 'stellar', 'cosmic', 'aurora', 'prism', 'energy', 'photon', 'flux']
  };

  // Messages for different eras
  const eraMessages = {
    ancient: [
      "In the beginning, there was only seed and soil.",
      "Your words give life to ancient growth.",
      "The first gardens speak through your fingertips."
    ],
    medieval: [
      "Your garden flourishes through the ages.",
      "In every keystroke, life grows.",
      "The rhythm of words nurtures beauty."
    ],
    future: [
      "Your words shape worlds across time.",
      "Cosmic gardens bloom beyond the stars.",
      "Type the future into existence."
    ]
  };

  // Plant types for different eras
  const plantTypes = {
    ancient: ['🌿', '🌱', '🌳', '🌲', '🍃'],
    medieval: ['🌷', '🌹', '🌺', '🌻', '🌼'],
    future: ['✨', '🌟', '⭐', '💫', '🔮']
  };

  // Background colors for different eras
  const eraBgColors = {
    ancient: 'from-[#1A1810] to-[#2A3A20]',
    medieval: 'from-[#1F2039] to-[#3D2B56]',
    future: 'from-[#0A1A2F] to-[#1C1045]'
  };

  // Functions
  const getRandomWord = () => {
    const words = wordLists[era];
    return words[Math.floor(Math.random() * words.length)];
  };

  const addVine = () => {
    if (!gameAreaRef.current) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const positions = [
      { x: Math.random() * rect.width * 0.3, y: rect.height },
      { x: rect.width * 0.3 + Math.random() * rect.width * 0.4, y: rect.height },
      { x: rect.width * 0.7 + Math.random() * rect.width * 0.3, y: rect.height }
    ];
    
    const newVines = positions.map(pos => ({
      id: Date.now() + Math.random(),
      x: pos.x,
      y: pos.y
    }));

    setVines(prev => [...prev.slice(-6), ...newVines]);
  };

  const addPlant = () => {
    if (!gameAreaRef.current) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const plantEmojis = plantTypes[era];
    
    const plant = {
      id: Date.now(),
      emoji: plantEmojis[Math.floor(Math.random() * plantEmojis.length)],
      x: Math.random() * (rect.width - 40),
      y: Math.random() * (rect.height - 200) + 100,
      scale: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 20 - 10,
      opacity: 0.1
    };

    setPlants(prev => [...prev, plant]);

    setTimeout(() => {
      setPlants(prev => prev.map(p => p.id === plant.id ? { ...p, opacity: 1 } : p));
    }, 100);
  };

  const updateWPM = () => {
    const elapsed = (Date.now() - startTime.current) / 60000;
    const wpm = Math.round(wordsTyped / Math.max(0.1, elapsed));
    onWpmChange(wpm);
  };

  const displayMessage = () => {
    const messages = eraMessages[era];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const updateScore = (points: number) => {
    const bonusPoints = points * scoreMultiplier;
    const newScore = score + bonusPoints;
    setScore(newScore);
    setLastScoreIncrease(bonusPoints);
    setScoreAnimation(true);
    setTimeout(() => setScoreAnimation(false), 1000);
    onScoreChange(newScore);
  };

  const changeEra = () => {
    setIsTransitioning(true);
    
    setVines([]);
    
    if (era === 'ancient') {
      setEra('medieval');
      setScoreMultiplier(prev => prev + 0.5);
      toast({
        title: "Time Shifted",
        description: "Your garden evolves into the Medieval Age",
        duration: 3000
      });
    } else if (era === 'medieval') {
      setEra('future');
      setScoreMultiplier(prev => prev + 0.5);
      toast({
        title: "Time Shifted",
        description: "Your garden reaches the Cosmic Future",
        duration: 3000
      });
    } else {
      setEra('ancient');
      setScoreMultiplier(prev => prev + 0.5);
      toast({
        title: "Time Cycle Complete",
        description: "Your garden returns to its origins",
        duration: 3000
      });
    }
    
    setTimeout(() => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const newVines = Array.from({ length: 5 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * rect.width,
          y: rect.height
        }));
        setVines(newVines);
      }
    }, 1000);
    
    setTimeout(() => {
      setIsTransitioning(false);
      displayMessage();
    }, 1500);
    
    setFadeAnimation(true);
    setTimeout(() => setFadeAnimation(false), 1000);
    
    updateScore(500);
  };

  const renderProgressBar = () => (
    <motion.div 
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-96 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Progress 
        value={gardenEnergy} 
        className="h-3 bg-primary/20" 
      />
      <div className="mt-2 text-center text-sm text-primary/70">
        Garden Energy: {Math.round(gardenEnergy)}%
      </div>
    </motion.div>
  );

  // Initialize the game
  useEffect(() => {
    setCurrentWord(getRandomWord());
    startTime.current = Date.now();
    
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        addVine();
      }
    }, 500);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) {
        setGameStarted(true);
      }
      
      const key = e.key;
      
      if (key === 'Escape') {
        onGameOver();
        return;
      }
      
      if (key === 'Backspace') {
        setTypedWord(prev => prev.slice(0, -1));
        return;
      }
      
      if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
        setTypedWord(prev => prev + key);
        
        setTypingPulse(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const { 
    playCorrect, 
    playWrong, 
    playCombo, 
    playGameOver, 
    startBgMusic, 
    stopBgMusic 
  } = useGameSound();

  useEffect(() => {
    startBgMusic();
    return () => stopBgMusic();
  }, []);

  const handleBackToMenu = () => {
    navigate('/mode-select');
  };

  useEffect(() => {
    if (typedWord.toLowerCase() === currentWord.toLowerCase()) {
      playCorrect();
      
      setWordsTyped(prev => prev + 1);
      setWordsCorrect(prev => prev + 1);
      setCombo(prev => prev + 1);
      setGardenEnergy(prev => Math.min(100, prev + 5 + (combo * 0.5)));
      
      const basePoints = currentWord.length * 10;
      const comboBonus = combo > 1 ? combo * 5 : 0;
      updateScore(basePoints + comboBonus);
      
      addVine();
      
      if (combo > 5) {
        addVine();
        playCombo();
      }
      
      if (Math.random() < 0.2) {
        displayMessage();
      }
      
      if (gardenEnergy >= 100) {
        setGardenEnergy(0);
        changeEra();
      }
      
      setTypedWord('');
      setCurrentWord(getRandomWord());
    } else if (typedWord && !currentWord.toLowerCase().startsWith(typedWord.toLowerCase())) {
      playWrong();
      setCombo(0);
      setScoreMultiplier(Math.max(1, scoreMultiplier - 0.1));
    }
  }, [typedWord]);

  useEffect(() => {
    const interval = setInterval(updateWPM, 2000);
    return () => clearInterval(interval);
  }, [wordsTyped]);

  const renderCurrentWord = () => {
    const letters = currentWord.split('');
    
    return (
      <div className="flex justify-center mb-4">
        {letters.map((letter, i) => {
          let className = "text-4xl orbitron transition-all";
          
          if (i < typedWord.length) {
            if (typedWord[i].toLowerCase() === letter.toLowerCase()) {
              className += " text-green-400";
            } else {
              className += " text-red-400";
            }
          } else {
            className += " text-gray-400";
          }
          
          return (
            <span key={i} className={className}>
              {letter}
            </span>
          );
        })}
      </div>
    );
  };

  const handleGameOver = () => {
    playGameOver();
    onGameOver();
  };

  const navigate = useNavigate();
  const handleBackToMenu = () => {
    navigate('/mode-select');
  };

  return (
    <div 
      className={`relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b ${eraBgColors[era]} transition-colors duration-1000 overflow-hidden`}
      ref={gameAreaRef}
    >
      <div className="absolute inset-0 z-0 bg-black/40">
        <AnimatePresence>
          {vines.map(vine => (
            <GrowingVine
              key={vine.id}
              startPosition={{ x: vine.x, y: vine.y }}
              era={era}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        className="absolute top-4 left-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <CyberBackButton onClick={handleBackToMenu} label="Mode Select" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-4 right-4 z-50 glass-effect rounded-xl p-4 border border-primary/30 shadow-lg backdrop-blur-md"
      >
        <div className="text-center">
          <h3 className="text-primary orbitron text-xl mb-1">Score</h3>
          <motion.div 
            className="text-3xl font-bold text-amber-400"
            animate={scoreAnimation ? { 
              scale: [1, 1.2, 1],
              transition: { duration: 0.5 }
            } : {}}
          >
            {score}
          </motion.div>
          
          {lastScoreIncrease > 0 && scoreAnimation && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0 }}
              className="text-green-400 text-sm"
            >
              +{lastScoreIncrease}
            </motion.div>
          )}
          
          <div className="text-sm text-foreground/70 mt-1">
            Multiplier: x{scoreMultiplier.toFixed(1)}
          </div>
        </div>
      </motion.div>

      <div className="relative z-20">
        <ZenParticles reactToTyping={false} typingEvent={false} />
      </div>
      
      <div className="relative z-20">
        <motion.div 
          className="relative z-20 bg-black/40 backdrop-blur-md rounded-xl p-8 border border-primary/30 shadow-lg max-w-xl w-full"
          animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 4 } }}
        >
          {gameStarted ? (
            <>
              <div className="text-center mb-6">
                <h3 className="orbitron text-2xl text-primary mb-2">Time Garden</h3>
                <p className="text-foreground/70 italic">Type the word to grow your garden...</p>
              </div>
              
              {renderCurrentWord()}
              
              <div className="mt-4 h-12 flex justify-center items-center">
                <div className="relative w-full max-w-xs">
                  <div className="h-12 w-full bg-black/30 rounded-md border border-foreground/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="orbitron text-lg typing-cursor"
                      animate={{ 
                        textShadow: typedWord.length > 0 ? ['0 0 5px #fff', '0 0 15px rgba(var(--primary), 0.8)', '0 0 5px #fff'] : 'none'
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {typedWord}
                    </motion.div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-6">
              <h3 className="orbitron text-2xl text-primary mb-4">Welcome to Time Garden</h3>
              <p className="text-foreground/70 mb-6">Press any key to begin your journey through time...</p>
              <div className="text-amber-400 text-sm italic">Type to grow plants across time</div>
            </div>
          )}
        </motion.div>
      </div>
      
      <AnimatePresence>
        {showMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-24 left-0 right-0 text-center"
          >
            <div className="inline-block bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-primary/30">
              <p className="orbitron text-lg text-foreground/90">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-6 text-center text-sm text-foreground/50">
        <p>Press ESC to exit Zen Mode</p>
      </div>
    </div>
  );
};
