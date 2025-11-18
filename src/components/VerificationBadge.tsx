import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VerificationBadgeProps {
  verified?: boolean;
  rating?: number;
}

export const VerificationBadge = ({ verified, rating }: VerificationBadgeProps) => {
  if (!verified && !rating) return null;

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {verified && (
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="secondary" className="gap-1">
                <Shield className="h-3 w-3" />
                Verified
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>This donor has been verified</p>
            </TooltipContent>
          </Tooltip>
        )}
        {rating && rating > 0 && (
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="outline" className="gap-1">
                <CheckCircle className="h-3 w-3" />
                {rating.toFixed(1)} ⭐
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Average donor rating</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};
