import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MapPin, Clock, Package, Phone, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Donate = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    location: "",
    pickupTime: "",
    contact: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.foodType || !formData.quantity || !formData.location || !formData.pickupTime || !formData.contact) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitted(true);
    toast.success("Your donation has been listed! NGOs will be notified.");
    
    // Reset form after 3 seconds and go back
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Donation Listed!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your contribution. NGOs in your area have been notified and will contact you shortly.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="w-full"
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

          <Card className="border-2 border-primary/10 bg-card/50 p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="foodType" className="flex items-center gap-2 text-base">
                  <Package className="h-4 w-4 text-primary" />
                  Type of Food *
                </Label>
                <Input
                  id="foodType"
                  name="foodType"
                  placeholder="e.g., Rice & Curry, Sandwiches, Fruits"
                  value={formData.foodType}
                  onChange={handleChange}
                  className="border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="flex items-center gap-2 text-base">
                  <Package className="h-4 w-4 text-primary" />
                  Quantity *
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  placeholder="e.g., 50 meals, 20kg, 100 portions"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4 text-primary" />
                  Pickup Location *
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Full address with landmark"
                  value={formData.location}
                  onChange={handleChange}
                  className="border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupTime" className="flex items-center gap-2 text-base">
                  <Clock className="h-4 w-4 text-primary" />
                  Available Until *
                </Label>
                <Input
                  id="pickupTime"
                  name="pickupTime"
                  type="datetime-local"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="border-primary/20 focus:border-primary"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  When should the food be picked up by?
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="flex items-center gap-2 text-base">
                  <Phone className="h-4 w-4 text-primary" />
                  Contact Number *
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.contact}
                  onChange={handleChange}
                  className="border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base">
                  Additional Details (Optional)
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Any special instructions, dietary info, or packaging details..."
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-24 border-primary/20 focus:border-primary"
                />
              </div>

              <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Important:</strong> Please ensure the food is safe, 
                  fresh, and properly stored. Our verified NGO partners will contact you to coordinate pickup.
                </p>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full h-12 text-lg shadow-lg transition-all hover:scale-105"
              >
                List Your Donation
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donate;
