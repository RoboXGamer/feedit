import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDonations } from "@/hooks/use-donations";
import { DonationForm } from "@/components/DonationForm";
import { useNotifications } from "@/hooks/use-notifications";

const Donate = () => {
  const navigate = useNavigate();
  const { addDonation } = useDonations();
  const { sendNotification } = useNotifications();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (data: any) => {
    // Parse coordinates from location field if available
    let coordinates = undefined;
    if (data.location) {
      const coordMatch = data.location.match(/(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/);
      if (coordMatch) {
        coordinates = {
          lat: parseFloat(coordMatch[1]),
          lng: parseFloat(coordMatch[2]),
        };
      }
    }

    addDonation({
      foodType: data.foodType,
      quantity: data.quantity,
      location: data.address, // Use the address field as the main location
      coordinates,
      pickupBy: data.pickupBy,
      contact: data.contact,
      description: data.description,
      imageUrl: data.imageUrl,
      donorVerified: true,
      donorRating: 4.5,
    });

    setSubmitted(true);
    toast.success("Your donation has been listed! NGOs will be notified.");
    
    // Send browser notification
    sendNotification(
      "New Donation Listed!",
      `${data.foodType} - ${data.quantity} available at ${data.address}`
    );
    
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center border-2 border-primary/20 bg-card/80 backdrop-blur-sm animate-scale-in">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto animate-pulse">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <Sparkles className="h-8 w-8 text-secondary mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-foreground mb-4 animate-fade-in">Donation Listed!</h2>
          <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Thank you for your contribution. NGOs in your area have been notified and will contact you shortly.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="w-full animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

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

        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-foreground">Donate Surplus Food</h1>
            <p className="text-lg text-muted-foreground">
              Help us reduce waste and feed those in need
            </p>
          </div>

          <Card className="border-2 border-primary/10 bg-card/50 p-8 backdrop-blur-sm animate-fade-in">
            <DonationForm onSubmit={handleSubmit} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donate;
