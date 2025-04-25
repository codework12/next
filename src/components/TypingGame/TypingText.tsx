
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

      return (
        <span
          key={index}
          className={`text-2xl font-medium transition-all ${
            isTyped
              ? isCorrect
                ? 'text-accent animate-float'
                : 'text-red-500'
              : 'text-text-secondary'
          }`}
        >
          {char}
        </span>
      );
    });
  };

  return <div className="min-h-[100px] text-center leading-relaxed tracking-wide">
    {renderText()}
  </div>;
};
