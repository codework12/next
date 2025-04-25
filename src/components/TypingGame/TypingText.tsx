
import React from 'react';

interface TypingTextProps {
  text: string;
  typedText: string;
}

export const TypingText = ({ text, typedText }: TypingTextProps) => {
  const renderText = () => {
    return text.split('').map((char, index) => {
      const isTyped = index < typedText.length;
      const isCorrect = isTyped && char === typedText[index];
      const isWrong = isTyped && char !== typedText[index];
      const isCurrent = index === typedText.length;

      return (
        <span
          key={index}
          className={`text-2xl font-medium transition-all ${
            isCurrent
              ? 'border-b-2 border-accent animate-pulse'
              : isTyped
              ? isCorrect
                ? 'text-accent'
                : 'text-red-500'
              : 'text-text-secondary'
          } ${isCurrent ? 'animate-pulse' : ''}`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-[100px] text-center leading-relaxed tracking-wide p-6 backdrop-blur-xs bg-white/5 rounded-lg mb-6">
      {renderText()}
    </div>
  );
};
