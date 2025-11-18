import { useState, useEffect } from "react";

export interface Donation {
  id: string;
  foodType: string;
  quantity: string;
  location: string;
  pickupBy: string;
  contact: string;
  description?: string;
  imageUrl?: string;
  status: "available" | "claimed";
  postedAt: string;
  claimedBy?: string;
  claimedAt?: string;
}

const STORAGE_KEY = "food_donations";

export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setDonations(JSON.parse(stored));
    }
  };

  const saveDonations = (newDonations: Donation[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDonations));
    setDonations(newDonations);
  };

  const addDonation = (donation: Omit<Donation, "id" | "status" | "postedAt">) => {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString(),
      status: "available",
      postedAt: new Date().toISOString(),
    };
    const updated = [...donations, newDonation];
    saveDonations(updated);
    return newDonation;
  };

  const claimDonation = (id: string, claimedBy: string) => {
    const updated = donations.map((d) =>
      d.id === id
        ? { ...d, status: "claimed" as const, claimedBy, claimedAt: new Date().toISOString() }
        : d
    );
    saveDonations(updated);
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
