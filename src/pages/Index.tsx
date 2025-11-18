import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Leaf, Users, ArrowRight, TrendingUp, Shield, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDonations } from "@/hooks/use-donations";
import { StatsCard } from "@/components/StatsCard";
import { RecentDonations } from "@/components/RecentDonations";

const Index = () => {
  const navigate = useNavigate();
  const { getStats, getRecentDonations } = useDonations();
  const stats = getStats();
  const recentDonations = getRecentDonations(6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-secondary/5 to-transparent" />
        
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Leaf className="h-4 w-4" />
              Sustainability Meets Humanity
            </div>
            
            <h1 className="mb-6 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
              Food Waste to Feed
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              Connecting surplus food with those who need it most. Every meal saved is a life touched.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button 
                size="lg" 
                className="group h-14 gap-2 bg-primary text-lg shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                onClick={() => navigate('/donate')}
              >
                Donate Food
                <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="group h-14 gap-2 border-2 border-primary/20 bg-background/50 text-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/5 hover:scale-105"
                onClick={() => navigate('/receive')}
              >
                Receive Donations
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          {/* Live Stats */}
          <div className="mt-20 grid gap-8 sm:grid-cols-4">
            <StatsCard 
              icon={Package} 
              label="Total Donations" 
              value={stats.total}
              delay={0}
            />
            <StatsCard 
              icon={TrendingUp} 
              label="Available Now" 
              value={stats.available}
              trend="Ready for pickup"
              delay={100}
            />
            <StatsCard 
              icon={Users} 
              label="Successfully Claimed" 
              value={stats.claimed}
              delay={200}
            />
            <StatsCard 
              icon={Shield} 
              label="Impact Score" 
              value={`${Math.round((stats.claimed / Math.max(stats.total, 1)) * 100)}%`}
              trend="Waste reduced"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">How It Works</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            A simple, three-step process to make a difference
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "List Your Food",
              description: "Canteens, hostels, and individuals post surplus food with details and pickup time",
              color: "primary",
            },
            {
              step: "2",
              title: "NGOs Claim",
              description: "Verified NGOs and volunteers browse and claim available donations instantly",
              color: "secondary",
            },
            {
              step: "3",
              title: "Coordinate Pickup",
              description: "Quick contact exchange and safe food collection before expiry",
              color: "accent",
            },
          ].map((item, i) => (
            <Card key={i} className="group relative overflow-hidden border-2 p-8 transition-all hover:scale-105 hover:border-primary hover:shadow-xl">
              <div className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-${item.color}/10`} />
              <div className={`relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-${item.color} text-2xl font-bold text-${item.color}-foreground shadow-md`}>
                {item.step}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Leaf className="mx-auto mb-6 h-16 w-16 text-primary" />
            <h2 className="mb-4 text-4xl font-bold text-foreground">The Problem We're Solving</h2>
            <p className="mb-6 text-lg text-foreground/80">
              College canteens, hostels, and homes waste tons of edible food daily while many go hungry. 
              We bridge this gap with technology, connecting those with surplus to those in need.
            </p>
            <div className="mx-auto max-w-xl rounded-2xl border-2 border-primary/20 bg-background/80 p-8 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-primary">
                "No edible food should be wasted when someone somewhere is hungry"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-12 text-center backdrop-blur-sm">
          <div className="relative z-10">
            <h2 className="mb-4 text-4xl font-bold text-foreground">Ready to Make a Difference?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join our community of changemakers today
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button 
                size="lg"
                className="h-14 gap-2 bg-primary text-lg shadow-lg transition-all hover:scale-105"
                onClick={() => navigate('/donate')}
              >
                Start Donating
                <Heart className="h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="h-14 gap-2 border-2 text-lg transition-all hover:scale-105"
                onClick={() => navigate('/receive')}
              >
                Join as NGO
                <Users className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Recent Donations Feed */}
      <RecentDonations donations={recentDonations} />
    </div>
  );
};

export default Index;
