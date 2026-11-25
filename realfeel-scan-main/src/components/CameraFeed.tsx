import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Settings } from "lucide-react";
import { useState } from "react";

export const CameraFeed = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Live Camera Feed</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border/50 hover:bg-accent/20"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setIsActive(!isActive)}
            variant={isActive ? "destructive" : "default"}
            size="sm"
            className={isActive ? "" : "bg-gradient-primary hover:opacity-90"}
          >
            {isActive ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            {isActive ? "Stop" : "Start"}
          </Button>
        </div>
      </div>
      
      <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg overflow-hidden">
        {isActive ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
                <Camera className="w-12 h-12 text-primary-foreground" />
              </div>
              <p className="text-muted-foreground">Camera feed would appear here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Connect with emotion detection API
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-full flex items-center justify-center">
                <CameraOff className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Click start to begin detection</p>
            </div>
          </div>
        )}
        
        {isActive && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
              <span className="text-sm text-foreground">LIVE</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};