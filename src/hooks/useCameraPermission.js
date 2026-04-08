import { useState } from "react";
import { Alert, Linking } from "react-native";
import { Camera } from "react-native-vision-camera";

export const useCameraPermission = () => {

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [cameraDenied, setCameraDenied] = useState(false);

  const requestCameraPermission = async () => {
    try {

      const permission = await Camera.getCameraPermissionStatus();

      // already granted
      if (permission === "granted") {
        setHasCameraPermission(true);
        return true;
      }

      const newPermission = await Camera.requestCameraPermission();

      if (newPermission === "granted") {
        setHasCameraPermission(true);
        setCameraDenied(false);
        return true;
      }

      // blocked case
      if (newPermission === "denied") {

        setCameraDenied(true);

        Alert.alert(
          "Camera Permission Required",
          "Please allow camera permission to continue",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      }

      return false;

    } catch (error) {
      console.log("Camera permission error:", error);
      return false;
    }
  };

  return {
    hasCameraPermission,
    cameraDenied,
    requestCameraPermission
  };

};