import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface EmotionCardProps {
  emotion: string;
  confidence: number;
  icon: string;
  isPrimary?: boolean;
}

export const EmotionCard = ({ emotion, confidence, icon, isPrimary = false }: EmotionCardProps) => {
  return (
    <Card className={`
      p-6 bg-gradient-card backdrop-blur-sm border-border/50 
      transition-smooth hover:shadow-glow hover:scale-105
      ${isPrimary ? 'shadow-glow animate-pulse-glow' : 'hover:shadow-accent'}
    `}>
      <div className="flex items-center gap-4">
        <div className={`
          text-3xl p-3 rounded-lg bg-gradient-primary
          ${isPrimary ? 'animate-float' : ''}
        `}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className={`
            font-semibold text-lg mb-2 
            ${isPrimary ? 'text-primary-glow' : 'text-foreground'}
          `}>
            {emotion}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Confidence</span>
              <span className={isPrimary ? 'text-primary-glow' : 'text-foreground'}>
                {confidence.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={confidence} 
              className={`h-2 ${isPrimary ? 'bg-primary/20' : 'bg-muted/50'}`}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};