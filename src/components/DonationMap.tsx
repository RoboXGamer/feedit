import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Package } from "lucide-react";
import { Donation } from "@/hooks/use-donations";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon - ensure it's only set once
const icon = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconShadow = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface DonationMapProps {
  donations: Donation[];
  onClaimDonation: (id: string) => void;
}

export const DonationMap = ({ donations, onClaimDonation }: DonationMapProps) => {
  const donationsWithCoords = donations.filter((d) => d.coordinates);

  // Default center (can be changed based on user location)
  const center: [number, number] = donationsWithCoords.length > 0 
    ? [donationsWithCoords[0].coordinates!.lat, donationsWithCoords[0].coordinates!.lng]
    : [28.6139, 77.2090]; // Default to Delhi

  if (donationsWithCoords.length === 0) {
    return (
      <Card className="p-8 text-center">
        <MapPin className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
        <h3 className="mb-2 text-xl font-semibold text-foreground">No locations available</h3>
        <p className="text-muted-foreground">
          Donations with location data will appear on the map
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {donationsWithCoords.map((donation) => (
          <Marker
            key={donation.id}
            position={[donation.coordinates!.lat, donation.coordinates!.lng]}
          >
            <Popup maxWidth={300}>
              <div className="space-y-2 p-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground">{donation.foodType}</h3>
                  <Badge variant={donation.status === "available" ? "default" : "secondary"}>
                    {donation.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    <span>{donation.quantity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{donation.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Pickup by: {new Date(donation.pickupBy).toLocaleDateString()}</span>
                  </div>
                </div>
                {donation.description && (
                  <p className="text-sm text-muted-foreground">{donation.description}</p>
                )}
                {donation.status === "available" && (
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => onClaimDonation(donation.id)}
                  >
                    Claim Donation
                  </Button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Card>
  );
};
