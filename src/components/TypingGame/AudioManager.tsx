
import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { Music, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioManagerProps {
  onType?: () => void;
}

export const AudioManager = ({ onType }: AudioManagerProps) => {
  const [muted, setMuted] = useState(false);
  const [keySound] = useState(() => new Howl({
    src: ['/sounds/key-press.mp3'],
    volume: 0.2,
    rate: 1.2,
  }));

  const [backgroundMusic] = useState(() => new Howl({
    src: ['/sounds/background-music.mp3'],
    volume: 0.1,
    loop: true,
  }));

  useEffect(() => {
    const handleKeyPress = () => {
      if (!muted) {
        keySound.play();
      }
      if (onType) onType();
    };

    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      backgroundMusic.stop();
    };
  }, [keySound, muted, onType, backgroundMusic]);

  const toggleMute = () => {
    setMuted(!muted);
    if (muted) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  };

  useEffect(() => {
    // Start background music on mount
    if (!muted) {
      backgroundMusic.play();
    }
  }, [backgroundMusic, muted]);

  return (
    <div className="absolute top-4 right-4 z-10">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMute}
        className="bg-white/5 backdrop-blur-md border border-white/10 text-text hover:text-accent"
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
    </div>
  );
};
