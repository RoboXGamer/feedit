import { useEffect, useState } from "react";

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt");

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
    
    // Check geolocation permission
    if ("geolocation" in navigator && "permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setLocationPermission(result.state as "granted" | "denied" | "prompt");
      });
    }
  }, []);

  const requestPermission = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      // Also request location permission
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          () => setLocationPermission("granted"),
          () => setLocationPermission("denied")
        );
      }
      
      return result === "granted";
    }
    return false;
  };

  const sendNotification = (title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
      });
    }
  };

  return {
    permission,
    locationPermission,
    requestPermission,
    sendNotification,
  };
};
