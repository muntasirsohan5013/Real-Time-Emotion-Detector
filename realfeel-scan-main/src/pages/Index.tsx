import { CameraFeed } from "@/components/CameraFeed";
import { EmotionDashboard } from "@/components/EmotionDashboard";
import { StatsPanel } from "@/components/StatsPanel";
import { Brain, Zap } from "lucide-react";
import heroImage from "@/assets/emotion-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-transparent">
                RealFeel Scan
              </h1>
              <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Advanced real-time emotion detection system using AI-powered facial expression analysis.
              Perfect for customer service, mental health applications, and human-computer interaction.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-4 py-2 bg-gradient-card backdrop-blur-sm rounded-full border border-border/50">
                <span className="text-sm text-primary-glow">✨ Real-time Analysis</span>
              </div>
              <div className="px-4 py-2 bg-gradient-card backdrop-blur-sm rounded-full border border-border/50">
                <span className="text-sm text-accent-glow">🎯 High Accuracy</span>
              </div>
              <div className="px-4 py-2 bg-gradient-card backdrop-blur-sm rounded-full border border-border/50">
                <span className="text-sm text-primary-glow">📊 Detailed Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="container mx-auto px-6 py-12 space-y-8">
        <StatsPanel />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CameraFeed />
          <EmotionDashboard />
        </div>
      </section>
    </div>
  );
};

export default Index;
