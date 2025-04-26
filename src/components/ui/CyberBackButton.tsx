
import * as React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './button';

interface CyberBackButtonProps {
  onClick: () => void;
  label?: string;
}

export const CyberBackButton = ({ onClick, label = 'Back to Main Menu' }: CyberBackButtonProps) => {
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
        size="lg"
        onClick={onClick}
        className="relative group backdrop-blur-sm bg-black/50 border-2 border-primary/50 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono tracking-wider">{label}</span>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-20 transition-opacity rounded-lg blur" />
      </Button>
    </motion.div>
  );
};
