import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Package, Phone, MessageCircle } from "lucide-react";
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
  const [mapError, setMapError] = useState(false);
  const donationsWithCoords = donations.filter((d) => d.coordinates);

  // Default center (can be changed based on user location)
  const center: [number, number] = donationsWithCoords.length > 0 
    ? [donationsWithCoords[0].coordinates!.lat, donationsWithCoords[0].coordinates!.lng]
    : [28.6139, 77.2090]; // Default to Delhi

  useEffect(() => {
    // Reset error on component mount
    setMapError(false);
  }, []);

  if (donationsWithCoords.length === 0 || mapError) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center border-2 border-dashed border-primary/20">
          <MapPin className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            {mapError ? "Map unavailable" : "No locations available"}
          </h3>
          <p className="text-muted-foreground">
            {mapError 
              ? "Showing contact details below instead" 
              : "Donations with location data will appear on the map"}
          </p>
        </Card>

        {/* Show contact details for all donations when map fails */}
        {mapError && donations.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Details</h3>
            {donations.map((donation) => (
              <Card key={donation._id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{donation.foodType}</h4>
                      <Badge variant={donation.status === "available" ? "default" : "secondary"} className="mt-1">
                        {donation.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>{donation.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{donation.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Pickup by: {new Date(donation.pickupBy).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <Phone className="h-4 w-4" />
                      <span>{donation.contact}</span>
                    </div>
                  </div>
                  {donation.status === "available" && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => onClaimDonation(donation._id)}
                      >
                        Claim Donation
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                        onClick={() => {
                          const message = encodeURIComponent(`Hi! I'm interested in your food donation: ${donation.foodType}`);
                          window.open(`https://wa.me/${donation.contact.replace(/\D/g, '')}?text=${message}`, '_blank');
                        }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  try {
    return (
      <Card className="overflow-hidden">
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: "500px", width: "100%" }}
          className="z-0"
          whenReady={() => setMapError(false)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {donationsWithCoords.map((donation) => (
            <Marker
              key={donation._id}
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
                      onClick={() => onClaimDonation(donation._id)}
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
  } catch (error) {
    setMapError(true);
    return null;
  }
};
