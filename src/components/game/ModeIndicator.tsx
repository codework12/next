
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ModeIndicatorProps {
  mode: string;
}

const modeDisplayNames: Record<string, string> = {
  'classic': 'Classic Battle',
  'timeattack': 'Time Attack',
  'survival': 'Survival Mode',
  'cyberhack': 'Cyber Hack'
};

export const ModeIndicator = ({ mode }: ModeIndicatorProps) => {
  const navigate = useNavigate();
  
  const displayName = modeDisplayNames[mode] || 'Standard Mode';
  
  return (
    <div className="absolute top-8 right-5 flex gap-4 items-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/80 px-4 py-2 rounded-xl font-mono text-lg border border-primary/50 shadow-[0_0_12px_rgba(var(--primary))]"
      >
        <span className="text-primary">⚔️ {displayName}</span>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => navigate('/mode-select')}
          className="relative group bg-black/80 border-2 border-primary/50 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-md filter blur opacity-0 group-hover:opacity-100 transition-opacity" />
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span className="font-mono">Return to Menu</span>
          <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </motion.div>
    </div>
  );
};
