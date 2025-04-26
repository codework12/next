
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameCanvas } from '@/components/game/GameCanvas';
import { GameUI } from '@/components/game/GameUI';
import { ComboDisplay } from '@/components/game/ComboDisplay';
import { GameOver } from '@/components/game/GameOver';
import { ModeIndicator } from '@/components/game/ModeIndicator';
import { AncientBackground } from '@/components/game/AncientBackground';
import { useResponsive } from '@/hooks/use-responsive';
import { TimeAttackMode } from '@/components/game/TimeAttackMode';

const Game = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [wpm, setWpm] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameMode, setGameMode] = useState('classic');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if player name exists
    const playerName = localStorage.getItem('playerName');
    if (!playerName) {
      navigate('/');
      return;
    }
    
    // Get selected game mode from localStorage
    const selectedMode = localStorage.getItem('selectedGameMode');
    if (selectedMode) {
      setGameMode(selectedMode);
    }
    
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Force landscape orientation hint for mobile
    if (isMobile) {
      const metaTag = document.createElement('meta');
      metaTag.name = 'viewport';
      metaTag.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.head.appendChild(metaTag);
      
      const orientationTag = document.createElement('meta');
      orientationTag.name = 'screen-orientation';
      orientationTag.content = 'landscape';
      document.head.appendChild(orientationTag);
      
      return () => {
        document.head.removeChild(metaTag);
        if (document.head.contains(orientationTag)) {
          document.head.removeChild(orientationTag);
        }
      };
    }
  }, [navigate, isMobile]);

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const handleRetry = () => {
    setIsGameOver(false);
    setScore(0);
    setLevel(1);
    setWpm(0);
    setCombo(0);
  };

  const handleBackToModes = () => {
    navigate('/mode-select');
  };

  // Render appropriate game mode component
  const renderGameMode = () => {
    if (gameMode === 'timeattack') {
      return (
        <TimeAttackMode 
          onScoreChange={setScore}
          onWpmChange={setWpm}
          onGameOver={handleGameOver}
        />
      );
    } 
    
    return (
      <GameCanvas 
        onScoreChange={setScore}
        onLevelChange={setLevel}
        onWpmChange={setWpm}
        onGameOver={handleGameOver}
        onComboChange={setCombo}
      />
    );
  };

  return (
    <div className={`relative min-h-screen transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <AncientBackground />
      
      {!isGameOver ? (
        <>
          {renderGameMode()}
          <GameUI score={score} level={level} wpm={wpm} />
          <ComboDisplay combo={combo} />
          <ModeIndicator mode={gameMode} />
        </>
      ) : (
        <GameOver 
          score={score}
          wpm={wpm}
          level={level}
          onRestart={handleRetry}
          onExit={handleBackToModes}
        />
      )}
    </div>
  );
};

export default Game;
