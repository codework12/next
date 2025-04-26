
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useResponsive } from "@/hooks/use-responsive";
import { CyberBackButton } from '@/components/ui/CyberBackButton';

interface ModeIndicatorProps {
  mode: string;
}

const modeDisplayNames: Record<string, string> = {
  'classic': 'Classic Battle',
  'combat': 'Combat Mode',
  'timeattack': 'Time Attack',
  'survival': 'Survival Mode',
  'cyberhack': 'Cyber Hack',
  'zen': 'Zen Mode',
  'code': 'Code Typing',
  'challenge': 'Challenge Mode',
  'story': 'Story Mode'
};

export const ModeIndicator = ({ mode }: ModeIndicatorProps) => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  
  const displayName = modeDisplayNames[mode] || 'Standard Mode';
  
  // Minimal mobile layout
  if (isMobile) {
    return (
      <div className="absolute top-2 left-0 right-0 flex justify-between items-center z-50 px-2">
        <CyberBackButton 
          onClick={() => navigate('/mode-select')} 
          variant="minimal" 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/70 px-3 py-1.5 rounded-full font-mono text-sm border border-primary/50 shadow-sm"
        >
          <span className="text-primary">⚔️ {displayName}</span>
        </motion.div>
      </div>
    );
  }
  
  // Tablet layout
  if (isTablet) {
    return (
      <div className="absolute top-4 right-4 left-4 flex justify-between items-center z-50">
        <CyberBackButton 
          onClick={() => navigate('/mode-select')} 
          label="Menu"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/80 px-4 py-2 rounded-xl font-mono text-base border border-primary/50 shadow-[0_0_12px_rgba(var(--primary),0.2)]"
        >
          <span className="text-primary">⚔️ {displayName}</span>
        </motion.div>
      </div>
    );
  }
  
  // Desktop layout
  return (
    <div className="absolute top-8 right-5 flex gap-4 items-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/80 px-4 py-2 rounded-xl font-mono text-lg border border-primary/50 shadow-[0_0_12px_rgba(var(--primary))]"
      >
        <span className="text-primary">⚔️ {displayName}</span>
      </motion.div>
      
      <CyberBackButton 
        onClick={() => navigate('/mode-select')} 
        label="Return to Menu"
        variant="glowing"
      />
    </div>
  );
};
