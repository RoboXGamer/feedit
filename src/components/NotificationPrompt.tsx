import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, X } from "lucide-react";

export const NotificationPrompt = () => {
  const [show, setShow] = useState(false);

  const requestPermission = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          () => console.log("Location granted"),
          () => console.log("Location denied")
        );
      }
      
      return result === "granted";
    }
    return false;
  };

  useEffect(() => {
    // Show prompt if notifications not enabled and not dismissed
    if ("Notification" in window && Notification.permission === "default") {
      const dismissed = localStorage.getItem("notification-prompt-dismissed");
      if (!dismissed) {
        setTimeout(() => setShow(true), 2000);
      }
    }
  }, []);

  const handleEnable = async () => {
    const granted = await requestPermission();
    if (granted) {
      setShow(false);
      localStorage.setItem("notification-prompt-dismissed", "true");
    }
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("notification-prompt-dismissed", "true");
  };

  if (!show) return null;

  return (
    <Card className="fixed bottom-4 right-4 z-50 max-w-sm border-2 border-primary/20 bg-card p-4 shadow-xl animate-fade-in">
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-2 rounded-full p-1 hover:bg-muted"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex gap-3">
        <div className="rounded-full bg-primary/10 p-2">
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 font-semibold text-foreground">Enable Notifications</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            Get notified when new donations are posted in your area
          </p>
          <Button onClick={handleEnable} size="sm" className="w-full">
            Enable Notifications
          </Button>
        </div>
      </div>
    </Card>
  );
};
