
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
  text: string;
  typedText: string;
}

export const TypingText = ({ text, typedText }: TypingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [text]);

  const renderText = () => {
    return text.split('').map((char, index) => {
      const isTyped = index < typedText.length;
      const isCorrect = isTyped && char === typedText[index];
      const isWrong = isTyped && char !== typedText[index];
      const isCurrent = index === typedText.length;

      // Create character elements with appropriate styling
      return (
        <span
          key={index}
          className={`relative transition-all inline-block ${
            char === ' ' ? 'px-1' : ''
          }`}
        >
          <span 
            className={`${
              isTyped 
                ? 'opacity-20' 
                : 'opacity-60'
            } ${isCurrent ? 'after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-accent after:animate-pulse' : ''}`}
          >
            {char}
          </span>
          
          {isTyped && (
            <span 
              className={`absolute top-0 left-0 ${
                isCorrect 
                  ? 'text-accent' 
                  : 'text-red-500 animate-[pulse_0.3s_ease]'
              }`}
            >
              {typedText[index]}
            </span>
          )}
        </span>
      );
    });
  };

  return (
    <motion.div 
      ref={containerRef}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[120px] text-center leading-relaxed tracking-wide px-6 py-8 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 mb-6 text-2xl font-medium overflow-auto shadow-lg"
    >
      {renderText()}
    </motion.div>
  );
};
