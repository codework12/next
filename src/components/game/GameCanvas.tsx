import React, { useEffect, useRef } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import { Progress } from '@/components/ui/progress';

export interface GameCanvasProps {
  onScoreChange: (score: number) => void;
  onLevelChange: (level: number) => void;
  onWpmChange: (wpm: number) => void;
  onGameOver: () => void;
  onComboChange: (combo: number) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  onScoreChange,
  onLevelChange,
  onWpmChange,
  onGameOver,
  onComboChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isPortrait } = useResponsive();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Game state
    let activeWords: any[] = [];
    let projectiles: any[] = [];
    let currentWord: any = null;
    let typedIndex = 0;
    let score = 0;
    let level = 1;
    let playerHP = 100;
    let enemyHP = 100;
    let wordSpeedBase = 2;
    let combo = 0;
    let wordsTyped = 0;
    const startTime = Date.now();
    let bgOffset = 0;
    let enemyFlashTimer = 0;

    // Load assets
    const bgImage = new Image(); bgImage.src = '/background.png';
    const characterImg = new Image(); characterImg.src = '/character.png';
    const enemyImg = new Image(); enemyImg.src = '/character2.png';
    const slashImg = new Image(); slashImg.src = '/slash.png';

    // Define classes inside effect
    class Word {
      text: string;
      x: number;
      y: number;
      speed: number;
      isHealing: boolean;
      constructor(text: string, x: number, y: number, speed: number, isHealing = false) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.isHealing = isHealing;
      }
      draw() {
        ctx.font = '26px MedievalSharp';
        ctx.fillStyle = this.isHealing ? '#FFD700' : '#E2E8F0';
        ctx.fillText(this.text, this.x, this.y);
        
        if (currentWord === this) {
          ctx.fillStyle = this.isHealing ? '#FFA500' : '#00CED1';
          ctx.shadowColor = this.isHealing ? '#FFA500' : '#00CED1';
          ctx.shadowBlur = 15;
          ctx.fillText(this.text.substring(0, typedIndex), this.x, this.y);
          ctx.shadowBlur = 0;
        }
      }
      update() {
        this.x -= this.speed;
        if (this.x <= 80) {
          activeWords = activeWords.filter(w => w !== this);
          playerHP -= 10 + level;
          combo = 0;
          onComboChange(combo);
          if (playerHP <= 0) endGame();
        }
      }
    }

    class Projectile {
      x: number;
      y: number;
      img: HTMLImageElement;
      w: number;
      h: number;
      speed = 25;
      damage: number;
      hit = false;
      hitFrames = 0; // NEW: extra frames after hit
    
      constructor(x: number, y: number, img: HTMLImageElement, w: number, h: number, damage: number) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.w = w;
        this.h = h;
        this.damage = damage;
      }
    
      update() {
        if (!this.hit) {
          this.x += this.speed;
          if (this.x >= canvas.width - 80) {
            this.hit = true;
            this.hitFrames = 5; // show for 5 frames after hit
            enemyFlashTimer = 5;
            enemyHP -= this.damage;
            if (enemyHP <= 0) levelUp();
          }
        } else {
          this.hitFrames--;
        }
      }
    
      draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      }
    }
    

    const spawnWord = () => {
      const words = ['fire','ice','storm','rune','portal','spell','magic','dark','light','burn','time','zap','chaos','nova'];
      const text = words[Math.floor(Math.random() * words.length)];
      const y = canvas.height - 120;
      const x = canvas.width - 80;
      const speed = wordSpeedBase + Math.random() * 0.5;
      const isHealing = Math.random() < 0.2;
      activeWords.push(new Word(text, x, y, speed, isHealing));
    };

    const drawHealthBar = (x: number, y: number, w: number, h: number, val: number, col: string, label: string) => {
      const barHeight = 12;
      const cornerRadius = 6;
      
      // Draw label with medieval font
      ctx.font = '14px MedievalSharp';
      ctx.fillStyle = '#E2E8F0';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + w/2, y - 8);

      // Draw background
      ctx.beginPath();
      ctx.roundRect(x, y, w, barHeight, cornerRadius);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fill();
      
      // Draw health bar with gradient
      const gradient = ctx.createLinearGradient(x, y, x + w, y);
      if (col === 'lime') {
        gradient.addColorStop(0, '#48BB78');
        gradient.addColorStop(1, '#68D391');
      } else {
        gradient.addColorStop(0, '#F56565');
        gradient.addColorStop(1, '#FC8181');
      }
      
      ctx.beginPath();
      ctx.roundRect(x, y, (w * val/100), barHeight, cornerRadius);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add shine effect
      const shine = ctx.createLinearGradient(x, y, x, y + barHeight);
      shine.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      shine.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shine;
      ctx.fill();
    };

    const updateWPM = () => {
      const elapsed = (Date.now() - startTime) / 60000;
      const wpm = Math.round(wordsTyped / elapsed);
      onWpmChange(wpm);
    };

    const levelUp = () => {
      level++;
      wordSpeedBase += 0.5;
      enemyHP = 100 + level * 5;
      onLevelChange(level);
    };

    const endGame = () => {
      cancelAnimationFrame(frameId);
      clearInterval(spawnInterval);
      onGameOver();
    };

    // Animate background
    let bgShiftX = 0;
    const animateBackground = () => {
      bgShiftX -= 0.5;
      const bgPattern = ctx.createPattern(bgImage, 'repeat');
      if (bgPattern) {
        ctx.save();
        ctx.translate(bgShiftX, 0);
        ctx.fillStyle = bgPattern;
        ctx.fillRect(-bgShiftX, 0, canvas.width + bgShiftX, canvas.height);
        ctx.restore();
      }
    };

    let frameId: number;
    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animated background
      animateBackground();
      
      // Add parallax effect to the mountains
      ctx.fillStyle = '#2D3748';
      for (let i = 0; i < 3; i++) {
        const mountainX = ((Date.now() / (2000 + i * 500)) % canvas.width);
        const mountainHeight = 200 - i * 30;
        ctx.beginPath();
        ctx.moveTo(mountainX - 100, canvas.height);
        ctx.lineTo(mountainX, canvas.height - mountainHeight);
        ctx.lineTo(mountainX + 100, canvas.height);
        ctx.fill();
      }

      // ground
      bgOffset -= 4;
      if (bgOffset <= -40) bgOffset = 0;
      for (let i = 0; i < canvas.width / 40 + 2; i++) {
        ctx.fillStyle = '#333'; ctx.fillRect(bgOffset + i * 40, canvas.height - 0, 40, 40);
      }

      // enemy
      if (enemyImg.complete) {
        if (enemyFlashTimer > 0) {
          ctx.globalAlpha = 0.7;
          ctx.drawImage(enemyImg, canvas.width - 250, canvas.height - 319, 265, 300);
          ctx.globalAlpha = 1;
          enemyFlashTimer--;
        } else {
          ctx.drawImage(enemyImg, canvas.width - 250, canvas.height - 319, 265, 300);
        }
      }
      drawHealthBar(canvas.width - 140, canvas.height - 180, 100, 10, enemyHP, 'red', 'ENEMY');

      // player
      if (characterImg.complete) ctx.drawImage(characterImg, 20, canvas.height - 319, 255, 300);
      drawHealthBar(20, canvas.height - 180, 100, 10, playerHP, 'lime', 'YOU');

      activeWords.forEach(w => { w.update(); w.draw(); });
      projectiles.forEach(p => { p.update(); p.draw(); });
      projectiles = projectiles.filter(p => !p.hit && p.x < canvas.width);

      updateWPM();
      frameId = requestAnimationFrame(gameLoop);
    };

    const spawnInterval = setInterval(spawnWord, 2000);
    gameLoop();

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (!currentWord) {
        for (const w of activeWords) {
          if (w.text[0] === key) { currentWord = w; typedIndex = 1; return; }
        }
      } else if (currentWord.text[typedIndex] === key) {
        typedIndex++;
        if (typedIndex >= currentWord.text.length) {
          activeWords = activeWords.filter(w => w !== currentWord);
          combo++;
          onComboChange(combo);
          wordsTyped++;
          score += combo;
          onScoreChange(score);
          if (currentWord.isHealing) playerHP = Math.min(100, playerHP + 20);
          else projectiles.push(new Projectile(80, canvas.height - 230, slashImg, 255, 160, 10 + level));
          currentWord = null;
          typedIndex = 0;
        }
      } else {
        combo = 0;
        onComboChange(combo);
        currentWord = null;
        typedIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(spawnInterval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};
