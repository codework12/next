
import React, { useState, useEffect, useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Zap, Shield, Award, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const gameScreenshots = [
  {
    id: 1,
    title: "Combat Mode Leaderboard",
    description: "Top warriors in the cybernetic arena",
    status: "ACTIVE",
    theme: {
      primary: "from-violet-500 to-purple-600",
      secondary: "from-indigo-400 to-violet-500",
      accent: "#8b5cf6",
      statusColor: "bg-green-500"
    },
    leaderboard: [
      { rank: 1, name: "CYBER_WARRIOR", score: 12500, wpm: 98, level: 25 },
      { rank: 2, name: "NEURAL_HUNTER", score: 11800, wpm: 95, level: 24 },
      { rank: 3, name: "SYSTEM_OVERRIDE", score: 11200, wpm: 92, level: 23 },
      { rank: 4, name: "BINARY_BLADE", score: 10800, wpm: 90, level: 22 },
      { rank: 5, name: "QUANTUM_STRIKE", score: 10500, wpm: 88, level: 21 }
    ]
  },
  {
    id: 2,
    title: "Time Attack Leaderboard",
    description: "Speed demons of the digital realm",
    status: "CRITICAL",
    theme: {
      primary: "from-red-500 to-rose-600",
      secondary: "from-orange-400 to-red-500",
      accent: "#ef4444",
      statusColor: "bg-red-500"
    },
    leaderboard: [
      { rank: 1, name: "SPEED_DEMON", score: 15000, wpm: 120, time: "01:23" },
      { rank: 2, name: "TIME_BENDER", score: 14500, wpm: 118, time: "01:25" },
      { rank: 3, name: "CHRONO_MASTER", score: 14000, wpm: 115, time: "01:28" },
      { rank: 4, name: "TEMPORAL_RUSH", score: 13500, wpm: 112, time: "01:30" },
      { rank: 5, name: "QUANTUM_SPEED", score: 13000, wpm: 110, time: "01:32" }
    ]
  },
  {
    id: 3,
    title: "Zen Mode Leaderboard",
    description: "Masters of neural harmony",
    status: "STABLE",
    theme: {
      primary: "from-cyan-500 to-blue-600",
      secondary: "from-blue-400 to-cyan-500",
      accent: "#0ea5e9",
      statusColor: "bg-blue-500"
    },
    leaderboard: [
      { rank: 1, name: "ZEN_MASTER", score: 20000, wpm: 85, streak: 150 },
      { rank: 2, name: "MEDITATION_X", score: 19500, wpm: 82, streak: 145 },
      { rank: 3, name: "PEACE_WARRIOR", score: 19000, wpm: 80, streak: 140 },
      { rank: 4, name: "HARMONY_FLOW", score: 18500, wpm: 78, streak: 135 },
      { rank: 5, name: "SERENITY_NOW", score: 18000, wpm: 75, streak: 130 }
    ]
  }
];

export const GameGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0.5);
  const [hoveredPlayer, setHoveredPlayer] = useState<number | null>(null);

  useEffect(() => {
    // Scanline animation
    const scanlineInterval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 1) % 100);
    }, 30);

    // Glow animation
    const glowInterval = setInterval(() => {
      setGlowIntensity(prev => {
        const newValue = prev + 0.015 * (Math.random() > 0.5 ? 1 : -1);
        return Math.max(0.3, Math.min(0.7, newValue));
      });
    }, 100);
    
    return () => {
      clearInterval(scanlineInterval);
      clearInterval(glowInterval);
    };
  }, []);

  const currentTheme = useMemo(() => {
    return gameScreenshots[activeIndex].theme;
  }, [activeIndex]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "ACTIVE": return (
        <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
          <motion.div 
            className={`w-2 h-2 rounded-full bg-green-500`}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-xs font-jetbrains text-white/70">{status}</span>
        </div>
      );
      case "CRITICAL": return (
        <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
          <motion.div 
            className={`w-2 h-2 rounded-full bg-red-500`}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-xs font-jetbrains text-white/70">{status}</span>
        </div>
      );
      default: return (
        <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
          <motion.div 
            className={`w-2 h-2 rounded-full bg-blue-500`}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-xs font-jetbrains text-white/70">{status}</span>
        </div>
      );
    }
  };

  // Generate rank icon
  const getRankIcon = (rank: number) => {
    if (rank === 1) return (
      <div className="relative">
        <div className="absolute inset-0 blur-md bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
        <Trophy className="w-6 h-6 text-yellow-300" />
      </div>
    );
    
    if (rank === 2) return (
      <div className="relative">
        <div className="absolute inset-0 blur-sm bg-gray-300 rounded-full opacity-50"></div>
        <Trophy className="w-5 h-5 text-gray-300" />
      </div>
    );
    
    if (rank === 3) return (
      <div className="relative">
        <div className="absolute inset-0 blur-sm bg-amber-700 rounded-full opacity-50"></div>
        <Trophy className="w-5 h-5 text-amber-700" />
      </div>
    );
    
    return (
      <span className="text-sm font-mono text-white/80 font-bold w-6 h-6 flex items-center justify-center">
        #{rank}
      </span>
    );
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        className="w-full"
        setApi={(api) => {
          api?.on("select", () => {
            setActiveIndex(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {gameScreenshots.map((screenshot, index) => (
            <CarouselItem key={screenshot.id} className="md:basis-3/4">
              <div 
                className={`relative h-[450px] md:h-[550px] rounded-xl overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? 'scale-100 opacity-100' : 'scale-90 opacity-70'
                }`}
              >
                {/* Cybernetic Background Effects */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${currentTheme.primary} animate-pulse`}
                  style={{ opacity: 0.1 }}
                  animate={{ 
                    opacity: [0.05, 0.15, 0.05],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Grid Background */}
                <div className="absolute inset-0 bg-grid opacity-10"></div>
                
                {/* Hexagon Grid */}
                <div className="absolute inset-0" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  opacity: 0.08 
                }}></div>
                
                {/* Pulse Glow Effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-b ${currentTheme.secondary}`}
                  style={{ opacity: 0.05 * glowIntensity }}
                />
                
                {/* Multiple Scanline Effect */}
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                      top: `${(scanlinePosition + i * 20) % 100}%`,
                      opacity: 0.15,
                    }}
                  />
                ))}
                
                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col items-center justify-start p-8 z-10">
                  <div className="w-full max-w-3xl relative">
                    {/* Header with 3D effect */}
                    <div className="mb-8 relative">
                      {/* Title with shadow layers for 3D effect */}
                      <div className="relative w-fit mx-auto">
                        {[...Array(6)].map((_, i) => (
                          <motion.h3 
                            key={i}
                            className={`font-orbitron text-4xl md:text-5xl font-bold text-center absolute top-0 left-0 right-0 text-transparent`}
                            style={{ 
                              textShadow: `0 ${i}px 0 rgba(${i % 2 ? '138, 92, 246' : '255, 255, 255'}, ${0.2 - i * 0.03})`,
                              transform: `translateY(${-i * 0.5}px)`,
                              opacity: 1 - i * 0.15
                            }}
                          >
                            {screenshot.title}
                          </motion.h3>
                        ))}
                        
                        {/* Visible title */}
                        <motion.h3 
                          className="font-orbitron text-4xl md:text-5xl font-bold text-center relative z-10"
                          style={{
                            WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            backgroundImage: `linear-gradient(180deg, white, rgba(255,255,255,0.7))`
                          }}
                          animate={{
                            textShadow: [
                              `0 0 10px rgba(${currentTheme.accent.replace('#', '')}, 0.7)`,
                              `0 0 20px rgba(${currentTheme.accent.replace('#', '')}, 0.9)`,
                              `0 0 10px rgba(${currentTheme.accent.replace('#', '')}, 0.7)`,
                            ]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {screenshot.title}
                        </motion.h3>
                      </div>
                      
                      <div className="absolute top-1 right-0 flex items-center gap-2">
                        {getStatusBadge(screenshot.status)}
                      </div>
                      
                      <motion.p 
                        className="text-white/60 mt-3 mb-6 text-center font-fira relative z-10"
                        animate={{
                          opacity: [0.6, 0.8, 0.6]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {screenshot.description}
                      </motion.p>
                    </div>
                    
                    {/* Futuristic 3D Leaderboard Table */}
                    <div className="relative backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
                      {/* Glow effects behind table */}
                      <motion.div 
                        className="absolute -inset-1 blur-lg opacity-30"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${currentTheme.accent}, transparent 70%)`
                        }}
                        animate={{
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Header */}
                      <div className="grid grid-cols-5 gap-4 p-4 bg-black/70 border-b border-white/20 font-jetbrains text-sm uppercase tracking-widest relative backdrop-blur-md">
                        {/* Header illumination */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"
                          animate={{
                            opacity: [0, 0.1, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Header titles */}
                        <div className="text-primary flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>Rank</span>
                        </div>
                        <div className="text-primary flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          <span>Player</span>
                        </div>
                        <div className="text-primary flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>Score</span>
                        </div>
                        <div className="text-primary flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          <span>WPM</span>
                        </div>
                        <div className="text-primary flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          <span>
                            {screenshot.id === 1 ? "Level" : 
                            screenshot.id === 2 ? "Time" : 
                            "Streak"}
                          </span>
                        </div>
                      </div>
                      
                      {/* Rows */}
                      <div className="space-y-0">
                        {screenshot.leaderboard.map((player, idx) => (
                          <motion.div 
                            key={player.rank}
                            className="grid grid-cols-5 gap-4 items-center relative backdrop-blur-sm"
                            onMouseEnter={() => setHoveredPlayer(player.rank)}
                            onMouseLeave={() => setHoveredPlayer(null)}
                            initial={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                            whileHover={{
                              backgroundColor: `rgba(${currentTheme.accent.replace('#', '')}, 0.15)`,
                              transition: { duration: 0.2 } 
                            }}
                            style={{
                              borderBottom: "1px solid rgba(255,255,255,0.08)"
                            }}
                          >
                            {/* Background highlight effect */}
                            <AnimatePresence>
                              {hoveredPlayer === player.rank && (
                                <motion.div 
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                  initial={{ opacity: 0, x: -100 }}
                                  animate={{ 
                                    opacity: 1, 
                                    x: 400,
                                    transition: { duration: 1 }
                                  }}
                                  exit={{ opacity: 0 }}
                                />
                              )}
                            </AnimatePresence>
                            
                            {/* Animated selection border for top 3 */}
                            {player.rank <= 3 && (
                              <motion.div 
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  borderLeft: player.rank === 1 ? `2px solid rgba(255, 215, 0, 0.6)` :
                                            player.rank === 2 ? `2px solid rgba(192, 192, 192, 0.6)` :
                                            `2px solid rgba(205, 127, 50, 0.6)`
                                }}
                                animate={{
                                  opacity: [0.4, 1, 0.4]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                            )}
                            
                            {/* Rank */}
                            <div className="px-5 py-4 text-white/90 flex justify-center">
                              {getRankIcon(player.rank)}
                            </div>
                            
                            {/* Player Name */}
                            <div className="py-4">
                              <div className="flex items-center gap-2">
                                <div 
                                  className={`h-8 w-8 rounded flex items-center justify-center text-xs font-bold`}
                                  style={{ background: `linear-gradient(135deg, ${currentTheme.accent}60, transparent)` }}
                                >
                                  {player.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="text-white font-sourcecodepro font-semibold tracking-wider">
                                    {player.name.split('_')[0]}
                                    <span className="text-primary/80">_{player.name.split('_')[1]}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Score with animation for top players */}
                            <div className="py-4">
                              <motion.div 
                                className="flex items-center font-mono"
                                animate={player.rank <= 3 ? {
                                  textShadow: [
                                    `0 0 8px rgba(${currentTheme.accent.replace('#', '')}, 0.4)`,
                                    `0 0 12px rgba(${currentTheme.accent.replace('#', '')}, 0.7)`,
                                    `0 0 8px rgba(${currentTheme.accent.replace('#', '')}, 0.4)`
                                  ]
                                } : {}}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <span className="text-primary mr-1 font-medium">{Math.floor(player.score / 1000)}</span>
                                <span className="text-white/80">,</span>
                                <span className="text-white/90">{String(player.score % 1000).padStart(3, '0')}</span>
                              </motion.div>
                            </div>
                            
                            {/* WPM with animated effect for high values */}
                            <div className="py-4">
                              <motion.div 
                                className="text-center font-mono flex items-center justify-center"
                                animate={player.wpm > 90 ? {
                                  color: [
                                    'rgba(255,255,255,0.9)',
                                    currentTheme.accent,
                                    'rgba(255,255,255,0.9)'
                                  ]
                                } : {}}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <span className="text-2xl font-bold">{player.wpm}</span>
                              </motion.div>
                            </div>
                            
                            {/* Level/Time/Streak with custom styling */}
                            <div className="py-4 text-secondary">
                              <div className="flex items-center justify-center gap-1">
                                {screenshot.id === 1 && (
                                  <>
                                    <span className="text-lg font-bold">LVL</span>
                                    <div className="relative">
                                      <div className="absolute -inset-1 rounded-md blur-sm opacity-50" 
                                        style={{backgroundColor: currentTheme.accent}}></div>
                                      <div className={`bg-black/30 backdrop-blur-sm border border-white/20 px-2 py-1 rounded font-mono font-bold text-white relative z-10`}>
                                        {player.level}
                                      </div>
                                    </div>
                                  </>
                                )}
                                
                                {screenshot.id === 2 && (
                                  <div className="font-mono text-white bg-black/30 px-3 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                                    {player.time}
                                  </div>
                                )}
                                
                                {screenshot.id === 3 && (
                                  <div className="flex items-center gap-1">
                                    <div className="font-mono text-white/90">
                                      <span className="text-secondary/70 mr-1">×</span>
                                      {player.streak}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Border effects */}
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
                
                {/* Corner accents */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                  <div 
                    key={corner}
                    className={`absolute w-6 h-6 border-t-2 border-l-2 ${
                      corner === 'top-left' ? 'top-2 left-2' :
                      corner === 'top-right' ? 'top-2 right-2 rotate-90' :
                      corner === 'bottom-left' ? 'bottom-2 left-2 -rotate-90' :
                      'bottom-2 right-2 rotate-180'
                    } rounded-tl-lg opacity-70`}
                    style={{ borderColor: currentTheme.accent }}
                  ></div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-background/40 backdrop-blur-lg hover:bg-background/60 border-primary text-primary" />
        <CarouselNext className="right-2 bg-background/40 backdrop-blur-lg hover:bg-background/60 border-primary text-primary" />
      </Carousel>
      
      {/* Enhanced indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {gameScreenshots.map((_, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="relative flex items-center justify-center"
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    backgroundColor: gameScreenshots[index].theme.accent,
                    opacity: 0.4,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              <motion.div
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive ? 'w-8 bg-primary' : 'bg-white/30'
                }`}
                animate={
                  isActive 
                    ? { 
                        boxShadow: [
                          `0 0 0px rgba(var(--primary), 0)`,
                          `0 0 8px rgba(var(--primary), 0.6)`,
                          `0 0 0px rgba(var(--primary), 0)`
                        ]
                      } 
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
