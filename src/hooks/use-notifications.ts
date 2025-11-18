export const useNotifications = () => {
  const getPermission = () => {
    if ("Notification" in window) {
      return Notification.permission;
    }
    return "default";
  };

  const requestPermission = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      
      // Also request location permission
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          () => console.log("Location permission granted"),
          () => console.log("Location permission denied")
        );
      }
      
      return result === "granted";
    }
    return false;
  };

  const getLocation = () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => reject(error)
        );
      } else {
        reject(new Error("Geolocation not supported"));
      }
    });
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
    permission: getPermission(),
    requestPermission,
    sendNotification,
    getLocation,
  };
};
