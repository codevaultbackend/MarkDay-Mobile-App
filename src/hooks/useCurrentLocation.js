import { useEffect, useState } from "react";
import { Platform, Alert, Linking } from "react-native";
import {
    check,
    requestMultiple,
    PERMISSIONS,
    RESULTS,
} from "react-native-permissions";

import axios from "axios";   // ✅ Missing import

import { NativeModules } from "react-native";
 

const { CustomLocationModule, GpsModule } = NativeModules;
let cachedLocation = null;
let cachedAddress = null;
let isFetching = false;
let globalLoading = false;
let listeners = [];
const notify = () => {
    listeners.forEach(listener =>
        listener({
            location: cachedLocation,
            address: cachedAddress,
            loading: globalLoading
        })
    );
};


export const useCurrentLocation = () => {
    const [location, setLocation] = useState(cachedLocation);
    const [loading, setLoading] = useState(globalLoading);
    const [address, setAddress] = useState(cachedAddress);


    useEffect(() => {

        const listener = (data) => {
            setLocation(data.location);
            setAddress(data.address);
            setLoading(data.loading);
        };

        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        };

    }, []);
    // ============================
    // Convert Lat/Lng to Address
    // ============================

    const getAddressFromCoords = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=c9fb8a10e0ae43cfb00b5d162a791441`
            );

            return (
                response?.data?.results?.[0]?.formatted ||
                `${lat}, ${lng}`
            );

        } catch (error) {
            console.log("Geocode error:", error);
            return `${lat}, ${lng}`;
        }
    };

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

            const result = await requestMultiple([permission]);
            status = result[permission];

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

        // already cached
        if (cachedLocation) {
            setLocation(cachedLocation);
            setAddress(cachedAddress);
            return cachedLocation;
        }

        // already fetching
        if (isFetching) {
            setLoading(true);
            return;
        }

        try {

            isFetching = true;
            globalLoading = true;
            setLoading(true);
            notify();

            const hasPermission = await requestLocationPermission();

            if (!hasPermission) return null;

            const isGpsEnabled = await GpsModule.isGpsEnabled();

            if (!isGpsEnabled) {
                await GpsModule.enableGps();
            }

            const result = await CustomLocationModule.getCurrentLocation();
            // Alert.alert("LOcation fetch naive module")

            cachedLocation = result;
            notify();

            setLocation(result);
            // Alert.alert("LOcation fetch naive module address fromcoords")
            const addr = await getAddressFromCoords(
                result.latitude,
                result.longitude
            );
            console.log(addr, "addr")

            cachedAddress = addr;
            notify();
            setAddress(addr);

            return result;

        } catch (error) {
            console.log(error);
            return null;
        } finally {

            isFetching = false;
            globalLoading = false;
            setLoading(false);
            notify();
        }
    };

    return {
        location,
        address,
        loading,

        getCurrentLocation,
    };
};