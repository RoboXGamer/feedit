import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Package, ImageIcon } from "lucide-react";
import { Donation } from "@/hooks/use-donations";
import { useNavigate } from "react-router-dom";

interface RecentDonationsProps {
  donations: Donation[];
}

export const RecentDonations = ({ donations }: RecentDonationsProps) => {
  const navigate = useNavigate();

  const timeAgo = (dateString: string) => {
    const now = new Date().getTime();
    const posted = new Date(dateString).getTime();
    const diff = Math.floor((now - posted) / 60000);
    
    if (diff < 60) return `${diff} mins ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  if (donations.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">Recent Donations</h2>
          <p className="text-lg text-muted-foreground">
            Latest food donations from our community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation, idx) => (
            <Card
              key={donation._id}
              className="border-2 border-primary/20 bg-card/50 p-4 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/40 hover:shadow-lg cursor-pointer animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
              onClick={() => navigate('/receive')}
            >
              {donation.imageUrl ? (
                <img
                  src={donation.imageUrl}
                  alt={donation.foodType}
                  className="h-32 w-full object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="h-32 w-full flex items-center justify-center bg-muted rounded-lg mb-3">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              
              <h3 className="font-bold text-lg text-foreground mb-2">
                {donation.foodType}
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4 text-primary" />
                  <span>{donation.quantity}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="truncate">{donation.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant={donation.status === "available" ? "default" : "outline"}>
                    {donation.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {timeAgo(donation.postedAt)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
