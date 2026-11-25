import { Card } from "@/components/ui/card";
import { Activity, Clock, TrendingUp, Users } from "lucide-react";

export const StatsPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:shadow-accent transition-smooth">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Sessions</p>
            <p className="text-xl font-bold text-foreground">12</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:shadow-accent transition-smooth">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Clock className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Session Time</p>
            <p className="text-xl font-bold text-foreground">4:32</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:shadow-accent transition-smooth">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-xl font-bold text-foreground">94.2%</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:shadow-accent transition-smooth">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Users className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Detections</p>
            <p className="text-xl font-bold text-foreground">1,284</p>
          </div>
        </div>
      </Card>
    </div>
  );
};