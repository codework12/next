
import * as React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { useResponsive } from '@/hooks/use-responsive';

interface CyberBackButtonProps {
  onClick: () => void;
  label?: string;
  variant?: 'default' | 'minimal' | 'glowing';
}

export const CyberBackButton = ({ onClick, label = 'Back to Main Menu', variant = 'default' }: CyberBackButtonProps) => {
  const { isMobile, isTablet } = useResponsive();
  
  // Minimal design for mobile devices
  if (variant === 'minimal' || (isMobile && !variant)) {
    return (
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-20"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className="rounded-full bg-black/40 backdrop-blur-md hover:bg-primary/20 border border-primary/30"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </Button>
      </motion.div>
    );
  }

  // Glowing variant
  if (variant === 'glowing') {
    return (
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/20 to-accent/10 rounded-lg blur-md animate-pulse-glow" />
        <Button 
          variant="outline" 
          size={isTablet ? "default" : "lg"}
          onClick={onClick}
          className="relative group backdrop-blur-md bg-black/50 border-2 border-primary/70 text-primary hover:bg-primary/30 hover:border-primary transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
          <span className={`font-mono tracking-wider ${isMobile ? 'text-sm' : ''}`}>{label}</span>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-20 transition-opacity rounded-md blur" />
        </Button>
      </motion.div>
    );
  }
  
  // Default style (enhanced from original)
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl" />
      <Button 
        variant="outline" 
        size={isMobile || isTablet ? "default" : "lg"}
        onClick={onClick}
        className="relative group backdrop-blur-sm bg-black/50 border-2 border-primary/50 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
        <span className={`font-mono tracking-wider ${isMobile ? 'text-sm' : ''}`}>{label}</span>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-20 transition-opacity rounded-lg blur" />
      </Button>
    </motion.div>
  );
};
