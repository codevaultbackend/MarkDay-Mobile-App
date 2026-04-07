import { useState } from "react";
import { Platform, Alert, Linking } from "react-native";
import {
  check,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";

import { NativeModules } from "react-native";

const { CustomLocationModule, GpsModule } = NativeModules;

export const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ============================
  // Permission Request
  // ============================

  const requestLocationPermission = async () => {
    const permission =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    try {
      let status = await check(permission);

      if (status === RESULTS.GRANTED) return true;

      if (
        status === RESULTS.DENIED ||
        status === RESULTS.LIMITED ||
        status === RESULTS.UNAVAILABLE ||
        status === RESULTS.BLOCKED ||
        status === RESULTS.NOT_DETERMINED
      ) {
        const result = await requestMultiple([permission]);
        status = result[permission];
      }

      if (status === RESULTS.GRANTED) return true;

      if (status === RESULTS.BLOCKED) {
        Alert.alert(
          "Location Permission Required",
          "Please enable location permission from settings",
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
      console.log("Permission Error:", error);
      return false;
    }
  };

  // ============================
  // Get Current Location
  // ============================

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Permission
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        setError("Permission denied");
        return null;
      }

      // 2. GPS Check
      const isGpsEnabled = await GpsModule.isGpsEnabled();

      if (!isGpsEnabled) {
        await GpsModule.enableGps();
      }

      // 3. Get Location
      const result = await CustomLocationModule.getCurrentLocation();

      setLocation(result);

      return result;
    } catch (err) {
      console.log("Location Error:", err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    loading,
    error,
    getCurrentLocation,
  };
};