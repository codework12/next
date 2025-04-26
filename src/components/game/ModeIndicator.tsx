
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
      <div className="bg-black/80 px-4 py-2 rounded-xl font-mono text-lg border border-primary/50 shadow-[0_0_12px_rgba(var(--primary))]">
        <span className="text-primary">⚔️ {displayName}</span>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate('/mode-select')}
        className="bg-black/80 border border-primary/50 text-primary hover:bg-primary/20"
      >
        <ArrowLeft className="mr-1 w-4 h-4" />
        Back
      </Button>
    </div>
  );
};
