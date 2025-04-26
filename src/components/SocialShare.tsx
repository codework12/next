
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Share2, Sparkles, Infinity } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
=======
import { Share, Sparkles, Infinity } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
>>>>>>> caffdb8 (add)

export const SocialShare = () => {
  const { toast } = useToast();
  const shareUrl = window.location.href;

<<<<<<< HEAD
  const handleShare = async () => {
=======
  const handleShare = async (platform: string) => {
>>>>>>> caffdb8 (add)
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Typing Craft',
          text: 'Master the art of combat through typing in this thrilling time-travel shooter!',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
<<<<<<< HEAD
          title: "✨ Link Copied!",
          description: "Share the experience with your friends!",
          className: "bg-background/95 border border-primary/20",
=======
          title: "Link copied!",
          description: "Share the game with your friends!",
>>>>>>> caffdb8 (add)
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="flex justify-center gap-4">
<<<<<<< HEAD
      <motion.div 
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Button 
          variant="outline" 
          size="lg"
          className="relative bg-background/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
          onClick={handleShare}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <Share2 className="w-5 h-5 mr-2 text-primary" />
          <span className="mr-2 font-mono">Share Adventure</span>
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </motion.div>
=======
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Button 
          variant="outline" 
          className="relative bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-primary/10"
          onClick={() => handleShare('general')}
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-md">
            <div className="tech-scanline"></div>
          </div>
          <Share className="w-5 h-5 mr-2 text-primary" />
          <span className="mr-2">Share Game</span>
          <Infinity className="w-4 h-4 text-accent animate-pulse" />
        </Button>
      </div>
>>>>>>> caffdb8 (add)
    </div>
  );
};
