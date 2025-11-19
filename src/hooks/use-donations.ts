import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export interface Donation {
  _id: Id<"donations">;
  foodType: string;
  quantity: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  pickupBy: string;
  contact: string;
  description?: string;
  imageUrl?: string;
  status: "available" | "claimed";
  postedAt: string;
  claimedBy?: string;
  claimedAt?: string;
  donorRating?: number;
  donorVerified?: boolean;
  reviews?: { rating: number; comment: string; reviewedAt: string }[];
}

export const useDonations = () => {
  const donations = useQuery(api.donations.list) ?? [];
  const addMutation = useMutation(api.donations.add);
  const claimMutation = useMutation(api.donations.claim);

  const addDonation = async (donation: Omit<Donation, "_id" | "status" | "postedAt">) => {
    try {
      await addMutation(donation);
    } catch (error) {
      console.error("Failed to add donation:", error);
      throw error;
    }
  };

  const claimDonation = async (id: Id<"donations">, claimedBy: string) => {
    try {
      await claimMutation({ id, claimedBy });
    } catch (error) {
      console.error("Failed to claim donation:", error);
      throw error;
    }
  };

  const getStats = () => {
    const total = donations.length;
    const claimed = donations.filter((d) => d.status === "claimed").length;
    const available = total - claimed;
    return { total, claimed, available };
  };

  const getRecentDonations = (limit = 5) => {
    return [...donations]
      .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
      .slice(0, limit);
  };

  return {
    donations,
    addDonation,
    claimDonation,
    getStats,
    getRecentDonations,
  };
};
