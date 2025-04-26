
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Lock, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface GameModeProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  features: string[];
  isLocked: boolean;
  unlockRequirement?: string;
  icon?: string;
}

const GameModeSelection = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const gameModes: GameModeProps[] = [
    {
      id: 'combat',
      title: 'Combat Mode',
      description: 'Battle enemies by typing words. Each correct word deals damage to the enemy. Survive as long as possible!',
      difficulty: 'medium',
      features: ['Enemy health system', 'Combo multiplier', 'Power-ups', 'Progressive difficulty'],
      isLocked: false,
      icon: '⚔️'
    },
    {
      id: 'timeattack',
      title: 'Time Attack',
      description: 'Complete typing challenges against the clock. Test your speed and accuracy in this fast-paced mode!',
      difficulty: 'easy',
      features: ['Timer countdown', 'WPM tracking', 'Accuracy rating', 'Progressive difficulty'],
      isLocked: true,
      unlockRequirement: 'Complete Combat Mode level 5',
      icon: '⏱️'
    },
    {
      id: 'code',
      title: 'Code Typing',
      description: 'Practice typing code snippets in various programming languages. Perfect for developers!',
      difficulty: 'hard',
      features: ['Syntax highlighting', 'Multiple languages', 'Error detection', 'Code completion'],
      isLocked: true,
      unlockRequirement: 'Complete Combat Mode level 10',
      icon: '💻'
    }
  ];

  const handleModeSelect = (mode: string) => {
    if (mode !== 'combat') {
      return; // Only allow combat mode for now
    }
    
    setSelectedMode(mode);
    setIsLoading(true);
    
    localStorage.setItem('selectedGameMode', mode);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/game');
    }, 1500);
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-primary';
    }
  };

  return (
    <div className={`min-h-screen w-full bg-background transition-opacity duration-1000 flex flex-col items-center justify-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-radial-gradient"></div>
      <div className="absolute inset-0 bg-cyber-grid bg-grid"></div>
      <div className="tech-scanline"></div>

      <div className="container relative z-10 px-4 py-16 max-w-7xl">
        <Button 
          variant="ghost"
          className="absolute top-8 left-8 text-xl flex items-center gap-2 hover:bg-primary/20 transition-all duration-300"
          onClick={handleBackToMenu}
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Main Menu
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="orbitron text-5xl md:text-6xl font-bold mb-6 text-glow-intense bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Select Your Battle Mode
          </h1>
          <p className="exo text-xl text-foreground/80 max-w-2xl mx-auto">
            Choose your combat arena and test your typing skills against various challenges
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-16 space-y-8">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">{selectedMode === 'combat' ? '⚔️' : '⌨️'}</span>
              </div>
            </div>
            <div className="text-center space-y-4">
              <h3 className="orbitron text-2xl font-bold text-primary">Preparing your battle arena...</h3>
              <div className="flex justify-center space-x-2">
                <span className="animate-pulse">⋯</span>
                <span className="animate-pulse delay-100">⋯</span>
                <span className="animate-pulse delay-200">⋯</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameModes.map((mode) => (
              <div key={mode.id} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <Card className={`relative h-full border border-primary/30 backdrop-blur-sm overflow-hidden transition-all duration-300 ${mode.isLocked ? 'opacity-70' : 'hover:border-primary/60 neon-border'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <h3 className="orbitron text-2xl font-bold text-primary flex items-center gap-2">
                        {mode.icon} {mode.title}
                        {mode.isLocked && <Lock className="inline ml-2 w-5 h-5" />}
                      </h3>
                      <Badge className={`${getDifficultyColor(mode.difficulty)} text-white`}>
                        {mode.difficulty.charAt(0).toUpperCase() + mode.difficulty.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground/80 mt-2">{mode.description}</p>
                  </CardHeader>
                  <CardContent className="py-4">
                    <ul className="space-y-2">
                      {mode.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Star className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {mode.isLocked ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button disabled className="w-full bg-primary/50 hover:bg-primary/50 cursor-not-allowed">
                            Locked
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="glass-effect text-center p-3">
                          <p className="text-sm">{mode.unlockRequirement}</p>
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <Button 
                        onClick={() => handleModeSelect(mode.id)}
                        className="w-full orbitron bg-primary hover:bg-primary/90 hover:scale-105 transition-transform animate-pulse-glow"
                      >
                        Play Now
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameModeSelection;
