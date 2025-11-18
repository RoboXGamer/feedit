import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Clock, Package, Phone, Search, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

// Mock data for available donations
const mockDonations = [
  {
    id: 1,
    foodType: "Rice & Dal (North Indian)",
    quantity: "50 meals",
    location: "IIT Delhi Hostel Mess, Hauz Khas",
    pickupBy: "Today, 8:00 PM",
    contact: "+91 98765 43210",
    description: "Freshly cooked, vegetarian. Containers available.",
    status: "available",
    postedAt: "30 mins ago",
  },
  {
    id: 2,
    foodType: "Sandwiches & Juice",
    quantity: "100 portions",
    location: "Office Cafeteria, Cyber City, Gurgaon",
    pickupBy: "Today, 7:30 PM",
    contact: "+91 98123 45678",
    description: "Veg & non-veg options. Packed individually.",
    status: "available",
    postedAt: "1 hour ago",
  },
  {
    id: 3,
    foodType: "Fresh Fruits & Salads",
    quantity: "20 kg",
    location: "Wholesale Market, Azadpur",
    pickupBy: "Tomorrow, 9:00 AM",
    contact: "+91 99887 76655",
    description: "Seasonal fruits, slightly overripe but edible.",
    status: "available",
    postedAt: "2 hours ago",
  },
];

const Receive = () => {
  const navigate = useNavigate();
  const [donations] = useState(mockDonations);
  const [searchQuery, setSearchQuery] = useState("");
  const [claimedIds, setClaimedIds] = useState<number[]>([]);

  const handleClaim = (id: number, contact: string) => {
    setClaimedIds([...claimedIds, id]);
    toast.success(`Claimed successfully! Contact: ${contact}`);
  };

  const filteredDonations = donations.filter(
    (donation) =>
      donation.foodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-foreground">Available Food Donations</h1>
            <p className="text-lg text-muted-foreground">
              Browse and claim donations to help those in need
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by food type or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-primary/20 pl-10 focus:border-primary h-12 text-base"
              />
            </div>
          </div>

          {/* Info Banner */}
          <Card className="mb-8 border-secondary/20 bg-secondary/5 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground">
                  <strong>For verified NGOs & volunteers only.</strong> When you claim a donation, 
                  contact details will be shared. Please coordinate pickup within the specified time.
                </p>
              </div>
            </div>
          </Card>

          {/* Donations List */}
          <div className="space-y-6">
            {filteredDonations.length === 0 ? (
              <Card className="border-2 border-dashed border-primary/20 p-12 text-center">
                <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">No donations found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search" : "Check back soon for new donations"}
                </p>
              </Card>
            ) : (
              filteredDonations.map((donation) => {
                const isClaimed = claimedIds.includes(donation.id);
                
                return (
                  <Card 
                    key={donation.id} 
                    className={`border-2 p-6 transition-all hover:shadow-lg ${
                      isClaimed 
                        ? 'border-muted bg-muted/30' 
                        : 'border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40'
                    }`}
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1 space-y-4">
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
                              <Badge variant="outline" className="text-muted-foreground">
                                {donation.postedAt}
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
                              <p className="font-medium text-foreground">Pickup by: {donation.pickupBy}</p>
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
                            onClick={() => handleClaim(donation.id, donation.contact)}
                          >
                            Claim Donation
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receive;
