import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star } from "lucide-react";

const gameScreenshots = [
  {
    id: 1,
    title: "Combat Mode Leaderboard",
    description: "Top warriors in the cybernetic arena",
    status: "ACTIVE",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

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
                className={`relative h-[400px] md:h-[500px] rounded-xl overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? 'scale-100 opacity-100' : 'scale-90 opacity-70'
                }`}
              >
                {/* Cybernetic Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 animate-pulse-glow"></div>
                <div className="absolute inset-0 bg-grid opacity-20"></div>
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
                  style={{
                    animation: "pulse 2s infinite",
                    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
                  }}
                ></div>
                
                {/* Scanline Effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
                  style={{
                    top: `${scanlinePosition}%`,
                    height: "2px",
                    opacity: 0.5,
                  }}
                ></div>
                
                {/* Preview content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 glass-effect">
                  <div className="relative w-full max-w-2xl">
                    <h3 className="orbitron text-2xl md:text-3xl text-primary font-bold mb-4 text-glow-intense text-center">
                      {screenshot.title}
                    </h3>
                    <div className="absolute top-0 right-0 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        screenshot.status === "ACTIVE" ? "bg-green-500" :
                        screenshot.status === "CRITICAL" ? "bg-red-500" :
                        "bg-blue-500"
                      } animate-pulse`}></div>
                      <span className="text-xs font-mono text-white/70">{screenshot.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-white/70 mb-6 text-center font-mono">
                    {screenshot.description}
                  </p>
                  
                  {/* Leaderboard Table */}
                  <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-primary/20">
                    <div className="grid grid-cols-5 gap-4 p-4 bg-background/20 border-b border-primary/20 font-mono text-sm">
                      <div className="text-primary">RANK</div>
                      <div className="text-primary">PLAYER</div>
                      <div className="text-primary">SCORE</div>
                      <div className="text-primary">WPM</div>
                      <div className="text-primary">
                        {screenshot.id === 1 ? "LEVEL" : 
                         screenshot.id === 2 ? "TIME" : 
                         "STREAK"}
                      </div>
                    </div>
                    <div className="space-y-2 p-4">
                      {screenshot.leaderboard.map((player) => (
                        <div 
                          key={player.rank}
                          className="grid grid-cols-5 gap-4 items-center p-2 hover:bg-primary/5 transition-colors rounded"
                        >
                          <div className="text-white/90">
                            {player.rank === 1 ? "🥇" : 
                             player.rank === 2 ? "🥈" : 
                             player.rank === 3 ? "🥉" : 
                             `#${player.rank}`}
                          </div>
                          <div className="text-white/90 font-medium">{player.name}</div>
                          <div className="text-primary">{player.score.toLocaleString()}</div>
                          <div className="text-secondary">{player.wpm}</div>
                          <div className="text-accent">
                            {screenshot.id === 1 ? player.level :
                             screenshot.id === 2 ? player.time :
                             player.streak}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Tech effect */}
                <div className="absolute inset-0 border border-primary/20 rounded-xl"></div>
                <div 
                  className="absolute inset-0 border border-primary/10 rounded-xl"
                  style={{
                    animation: "pulse 2s infinite",
                    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
                  }}
                ></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm hover:bg-background border-primary text-primary" />
        <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm hover:bg-background border-primary text-primary" />
      </Carousel>
      
      <div className="flex justify-center mt-6 gap-2">
        {gameScreenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === index ? 'w-8 bg-primary' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
