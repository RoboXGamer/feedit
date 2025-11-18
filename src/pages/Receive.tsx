import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Package, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useDonations } from "@/hooks/use-donations";
import { DonationFilters } from "@/components/DonationFilters";
import { DonationCard } from "@/components/DonationCard";

const Receive = () => {
  const navigate = useNavigate();
  const { donations, claimDonation } = useDonations();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const handleClaim = (id: string) => {
    claimDonation(id, "NGO User");
    setClaimedIds([...claimedIds, id]);
    const donation = donations.find(d => d.id === id);
    toast.success(`Claimed successfully! Contact: ${donation?.contact}`);
  };

  const filteredDonations = useMemo(() => {
    let filtered = donations.filter(
      (donation) =>
        (donation.foodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (statusFilter === "all" || donation.status === statusFilter)
    );

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime();
      } else if (sortBy === "expiring") {
        return new Date(a.pickupBy).getTime() - new Date(b.pickupBy).getTime();
      }
      return 0;
    });

    return filtered;
  }, [donations, searchQuery, statusFilter, sortBy]);

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

          {/* Filters */}
          <div className="mb-8">
            <DonationFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
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
              filteredDonations.map((donation, idx) => (
                <div 
                  key={donation.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <DonationCard
                    donation={donation}
                    onClaim={handleClaim}
                    isClaimed={claimedIds.includes(donation.id) || donation.status === "claimed"}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receive;
