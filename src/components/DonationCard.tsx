import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Package, Phone, CheckCircle } from "lucide-react";
import { Donation } from "@/hooks/use-donations";

interface DonationCardProps {
  donation: Donation;
  onClaim: (id: string) => void;
  isClaimed: boolean;
}

export const DonationCard = ({ donation, onClaim, isClaimed }: DonationCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClaim = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClaim(donation.id);
    }, 500);
  };

  const timeAgo = (dateString: string) => {
    const now = new Date().getTime();
    const posted = new Date(dateString).getTime();
    const diff = Math.floor((now - posted) / 60000);
    
    if (diff < 60) return `${diff} mins ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  return (
    <Card 
      className={`border-2 p-6 transition-all duration-500 hover:shadow-lg ${
        isAnimating ? 'animate-scale-in' : ''
      } ${
        isClaimed 
          ? 'border-muted bg-muted/30' 
          : 'border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 animate-fade-in'
      }`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 space-y-4">
          {donation.imageUrl && (
            <img
              src={donation.imageUrl}
              alt={donation.foodType}
              className="h-48 w-full object-cover rounded-lg border-2 border-primary/10 transition-transform hover:scale-105"
            />
          )}
          
          <div className="flex items-start justify-between">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                {donation.foodType}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Package className="h-3 w-3" />
                  {donation.quantity}
                </Badge>
                <Badge 
                  variant={donation.status === "available" ? "default" : "outline"}
                  className="gap-1"
                >
                  {donation.status === "available" ? (
                    <>Available</>
                  ) : (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      Claimed
                    </>
                  )}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {timeAgo(donation.postedAt)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-foreground">{donation.location}</p>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">
                  Pickup by: {new Date(donation.pickupBy).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Please collect before this time</p>
              </div>
            </div>

            {donation.description && (
              <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                <p className="text-sm text-foreground">{donation.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:w-48">
          {isClaimed ? (
            <>
              <Badge className="w-full justify-center bg-primary text-primary-foreground py-2">
                Claimed ✓
              </Badge>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
                <Phone className="mx-auto mb-1 h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground mb-1">Contact:</p>
                <p className="font-mono text-sm font-medium text-foreground">
                  {donation.contact}
                </p>
              </div>
            </>
          ) : (
            <Button
              size="lg"
              className="w-full h-12 shadow-md transition-all hover:scale-105"
              onClick={handleClaim}
            >
              Claim Donation
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
