import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Package, Phone, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface DonationFormData {
  foodType: string;
  quantity: string;
  location: string;
  pickupBy: string;
  contact: string;
  description: string;
  imageUrl?: string;
}

interface DonationFormProps {
  onSubmit: (data: DonationFormData) => void;
}

export const DonationForm = ({ onSubmit }: DonationFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DonationFormData>({
    foodType: "",
    quantity: "",
    location: "",
    pickupBy: "",
    contact: "",
    description: "",
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.foodType || !formData.quantity || !formData.location || !formData.pickupBy || !formData.contact) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSubmit(formData);
  };

  const nextStep = () => {
    if (step === 1 && (!formData.foodType || !formData.quantity)) {
      toast.error("Please fill in the food details");
      return;
    }
    if (step === 2 && (!formData.location || !formData.pickupBy)) {
      toast.error("Please fill in pickup details");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  step >= s
                    ? "border-primary bg-primary text-primary-foreground scale-110"
                    : "border-muted bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Food Details</span>
          <span>Pickup Info</span>
          <span>Review</span>
        </div>
      </div>

      {/* Step 1: Food Details */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
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
              className="border-primary/20 focus:border-primary transition-all"
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
              className="border-primary/20 focus:border-primary transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="flex items-center gap-2 text-base">
              <ImageIcon className="h-4 w-4 text-primary" />
              Food Image (Optional)
            </Label>
            <div className="flex gap-4 items-start">
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border-primary/20 focus:border-primary transition-all"
              />
            </div>
            {imagePreview && (
              <div className="mt-2 animate-scale-in">
                <img
                  src={imagePreview}
                  alt="Food preview"
                  className="h-40 w-full object-cover rounded-lg border-2 border-primary/20"
                />
              </div>
            )}
          </div>

          <Button type="button" onClick={nextStep} className="w-full h-12 text-lg">
            Next Step
          </Button>
        </div>
      )}

      {/* Step 2: Pickup Details */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
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
              className="border-primary/20 focus:border-primary transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupBy" className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-primary" />
              Available Until *
            </Label>
            <Input
              id="pickupBy"
              name="pickupBy"
              type="datetime-local"
              value={formData.pickupBy}
              onChange={handleChange}
              className="border-primary/20 focus:border-primary transition-all"
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
              className="border-primary/20 focus:border-primary transition-all"
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12">
              Back
            </Button>
            <Button type="button" onClick={nextStep} className="flex-1 h-12">
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
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
              className="min-h-24 border-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6 space-y-3">
            <h3 className="font-semibold text-foreground text-lg">Review Your Donation</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Food:</strong> {formData.foodType}</p>
              <p><strong>Quantity:</strong> {formData.quantity}</p>
              <p><strong>Location:</strong> {formData.location}</p>
              <p><strong>Pickup By:</strong> {new Date(formData.pickupBy).toLocaleString()}</p>
              <p><strong>Contact:</strong> {formData.contact}</p>
              {formData.description && <p><strong>Details:</strong> {formData.description}</p>}
            </div>
          </div>

          <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Important:</strong> Please ensure the food is safe, 
              fresh, and properly stored. Our verified NGO partners will contact you to coordinate pickup.
            </p>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12">
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-12 text-lg shadow-lg transition-all hover:scale-105"
            >
              List Your Donation
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};
