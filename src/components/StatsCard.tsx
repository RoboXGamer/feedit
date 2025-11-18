import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  delay?: number;
}

export const StatsCard = ({ icon: Icon, label, value, trend, delay = 0 }: StatsCardProps) => {
  return (
    <Card 
      className="border-primary/10 bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/30 hover:shadow-lg animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="mx-auto mb-3 h-8 w-8 text-primary animate-scale-in" />
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {trend && (
        <div className="mt-2 text-xs text-primary font-medium">{trend}</div>
      )}
    </Card>
  );
};
