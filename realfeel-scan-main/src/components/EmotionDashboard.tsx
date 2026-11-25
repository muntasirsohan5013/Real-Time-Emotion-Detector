import { EmotionCard } from "@/components/EmotionCard";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

const emotions = [
  { name: "Happy", icon: "😊", baseConfidence: 85, confidence: 85 },
  { name: "Neutral", icon: "😐", baseConfidence: 60, confidence: 60 },
  { name: "Surprised", icon: "😲", baseConfidence: 45, confidence: 45 },
  { name: "Sad", icon: "😢", baseConfidence: 30, confidence: 30 },
  { name: "Angry", icon: "😠", baseConfidence: 20, confidence: 20 },
  { name: "Fear", icon: "😨", baseConfidence: 15, confidence: 15 },
];

export const EmotionDashboard = () => {
  const [emotionData, setEmotionData] = useState(emotions);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isDetecting) {
        setEmotionData(prev => 
          prev.map(emotion => ({
            ...emotion,
            confidence: Math.max(0, Math.min(100, 
              emotion.baseConfidence + (Math.random() - 0.5) * 20
            ))
          }))
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isDetecting]);

  useEffect(() => {
    // Simulate detection starting
    const timer = setTimeout(() => setIsDetecting(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sortedEmotions = emotionData.sort((a, b) => b.confidence - a.confidence);
  const primaryEmotion = sortedEmotions[0];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-foreground mb-4">Real-Time Analysis</h2>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">{primaryEmotion.icon}</div>
          <h3 className="text-2xl font-bold text-primary-glow mb-2">
            {primaryEmotion.name}
          </h3>
          <p className="text-muted-foreground">
            Primary emotion detected with {primaryEmotion.confidence.toFixed(1)}% confidence
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedEmotions.map((emotion, index) => (
          <EmotionCard
            key={emotion.name}
            emotion={emotion.name}
            confidence={emotion.confidence}
            icon={emotion.icon}
            isPrimary={index === 0}
          />
        ))}
      </div>
    </div>
  );
};