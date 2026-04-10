import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
    Alert,
    AppState
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import RNFS from 'react-native-fs'
// Vision Camera
import { Camera, useCameraDevice, useCameraDevices } from "react-native-vision-camera";

import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

// Custom Hooks
import { useCurrentLocation } from '../../hooks/useCurrentLocation'

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useCameraPermission } from "../../hooks/useCameraPermission";

const { width } = Dimensions.get("window");

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// API
import { useMarkAttendanceMutation } from "../../redux/features/attendance/attendanceApi";

import useHandleMutation from "../../hooks/useHandleMutation";
import AttendanceSuccessScreen from './AttendanceSuccessScreen'

// Utils
import { getAuth } from "../../utils/authStorage";

// Redux
import { pushAlert } from "../../redux/slices/alertSlice";
import { useDispatch } from "react-redux";

import { useIsFocused } from "@react-navigation/native";
import { Image as ImageCompressor } from 'react-native-compressor';
import { cardStyle } from "../../utils/cardStyle";
const FacialVerificationScreen = ({ navigation }) => {

    const isFocused = useIsFocused()
    // Camera Active State (App Background / Foreground Handle)
    const [isActive, setIsActive] = useState(true);

    // API
    const [markAttendance] = useMarkAttendanceMutation();
    const { handleMutation, loading: ApiLoading, abort } = useHandleMutation();

    const dispatch = useDispatch()

    // Camera Position State
    const [cameraPosition, setCameraPosition] = useState("front");

    // Get Camera Device
    const device = useCameraDevice(cameraPosition);

    // Camera Ready State
    const [isCameraReady, setIsCameraReady] = useState(false);

    // Location Hook
    const { location, getCurrentLocation, loading, address } = useCurrentLocation();

    // API Type (Checkin / Checkout)
    const [ApiType, setApiType] = useState(null);

    // Camera Initializing State
    const [isInitializing, setIsInitializing] = useState(true);

    // Camera Permission Hook
    const {
        hasCameraPermission,
        cameraDenied,
        requestCameraPermission
    } = useCameraPermission();

    // Camera Ref
    const cameraRef = useRef(null);

    // Captured Image State
    const [captured, setCaptured] = useState(null);

    // Time State
    const [time, setTime] = useState(new Date());



    // =============================
    // Dynamic Time Update
    // =============================
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // =============================
    // Fetch Location Once
    // =============================
    useEffect(() => {
        if (!location && !loading) {
            getCurrentLocation();
        }
    }, []);

    useEffect(() => {
        setIsCameraReady(false)
    }, [cameraPosition])
    // =============================
    // Screen Focus Effect
    // Camera Permission Init
    // =============================
    useFocusEffect(
        useCallback(() => {

            const init = async () => {

                // Start Initializing
                setIsInitializing(true);

                // Request Camera Permission
                const camera = await requestCameraPermission();

                // If Permission Denied
                if (!camera) {
                    setIsInitializing(false);
                    return;
                }

                // Camera Ready
                setIsInitializing(false);
            };

            init();

        }, [])
    );

    // =============================
    // Take Photo Listener
    // =============================
    useEffect(() => {
        const unsubscribe = navigation.addListener(
            "take-photo",
            takePhoto
        );

        return unsubscribe;
    }, []);

    // =============================
    // App Background / Foreground Handle
    // =============================
    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            (state) => {
                if (state === "active") {
                    setIsActive(true);
                } else {
                    setIsActive(false);
                }
            }
        );

        return () => subscription.remove();
    }, []);


    // =============================
    // Flip Camera
    // ISSUE POINT:
    // Sometimes Camera not resetting properly
    // Because device changes before camera re-init
    // =============================


    // cancel api



    const flipCamera = () => {

        if (takingRef.current) return;
        abort();
        takingRef.current = false;   // 👈 add this
        setCaptured(null);
        setApiType(null);
        setIsCameraReady(false);

        setCameraPosition(prev =>
            prev === "front" ? "back" : "front"
        );
    };


    // =============================
    // Take Photo
    // =============================
    const capturedRef = useRef(null);
    const takingRef = useRef(false);
    useEffect(() => {
        capturedRef.current = captured;
    }, [captured]);

    const takePhoto = async () => {

        try {

            // Already captured check
            if (capturedRef.current) {
                return Alert.alert('Please retake before capturing again');
            }

            // Prevent double click
            if (takingRef.current) return;

            // Camera ready check
            if (!cameraRef.current) {
                Alert.alert('Camera is initializing, please wait...');
                return;
            }

            takingRef.current = true;

            // 📸 Capture Photo
            const photo = await cameraRef.current.takePhoto({
                flash: "off",
                qualityPrioritization: "balanced",
                enableAutoStabilization: true,
            });

            console.log("Original Path:", photo.path);

            // 🔥 Compress (Best Quality + Size Balance)
            const compressedPath = await ImageCompressor.compress(
                photo.path,
                {
                    compressionMethod: "auto",
                    maxWidth: 1400,   // 👈 resolution control
                    quality: 0.85     // 👈 quality maintain
                }
            );

            console.log("Compressed Path:", compressedPath);

            // 📊 Size Check
            const stat = await RNFS.stat(compressedPath);

            console.log(
                "📸 Compressed Size:",
                (stat.size / 1024).toFixed(2),
                "KB"
            );

            // Save Image
            setCaptured({
                ...photo,
                path: compressedPath
            });

            // Get Location if missing
            if (!location) {
                await getCurrentLocation();
            }

        } catch (error) {

            console.log("Capture Error:", error);

        } finally {

            takingRef.current = false;

        }
    };

    // =============================
    // Handle Check In
    // =============================
    const handleCheckIn = async () => {
        setApiType('check-in')
        const auth = await getAuth();

        // Location Check
        if (!location?.latitude || !location?.longitude) {
            dispatch(pushAlert({
                id: Date.now().toString(),
                type: "error",
                message: "Please wait, fetching your location. Attendance cannot be marked without location."
            }));
            setApiType(null);
            return;
        }

        // Photo Check
        if (!captured?.path) {
            dispatch(pushAlert({
                id: Date.now().toString(),
                type: "error",
                message: "Please capture your photo before marking attendance."
            }));
            setApiType(null);
            return;
        }

        const res = await handleMutation({
            apiFunc: markAttendance,
            params: {
                empId: auth?.user?.empId,
                name: auth?.user?.name,
                type: "in",
                location: `${location?.latitude},${location?.longitude}`,
                photo: captured?.path
            },
            showSuccess: true
        });

        console.log("Check In Response", res);
        setApiType(null)

        if (res) {
            navigation.reset({
                index: 1,
                routes: [
                    {
                        name: "Tabs",
                        params: { screen: "Home" }
                    },
                    {
                        name: "attendance-mark-success",
                        params: {
                            type: "out",
                            time: formattedTime,
                            location: address
                        }
                    }
                ]
            });
        }
    };


    const handleCheckOut = async () => {

        // Location Validation
        if (!location?.latitude || !location?.longitude) {
            dispatch(pushAlert({
                id: Date.now().toString(),
                type: "error",
                message: "Please wait, fetching your location. Check-out cannot be completed without location."
            }));
            return;
        }

        setApiType('check-out')
        const auth = await getAuth();

        const res = await handleMutation({
            apiFunc: markAttendance,
            params: {
                empId: auth?.user?.empId,
                name: auth?.user?.name,
                type: "out",
                location: `${location?.latitude},${location?.longitude}`,
            },
            showSuccess: true
        });

        setApiType(null)
        console.log("Check Out Response", res);

        if (res) {
            navigation.reset({
                index: 1,
                routes: [
                    {
                        name: "Tabs",
                        params: { screen: "Home" }
                    },
                    {
                        name: "attendance-mark-success",
                        params: {
                            type: "out",
                            time: formattedTime,
                            location: address
                        }
                    }
                ]
            });
        }
    };

    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const formattedDate = time.toLocaleDateString([], {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    return (
        <SafeAreaView className="flex-1 bg-primary" edges={['top', 'left', 'right']}>



            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >





                {/* Header */}
                <View className="flex-row items-center px-5 py-3">
                    <TouchableOpacity>
                        <Icon name="chevron-left" size={24} />
                    </TouchableOpacity>

                    <Text className="flex-1 text-center text-lg font-semibold">
                        Facial Verification
                    </Text>

                    <View className="w-6" />
                </View>

                {/* Camera Card */}
                <View className="mx-4 mt-2 rounded-3xl overflow-hidden bg-white" style={cardStyle}>
                    <View className="relative ">

                        {/* CAMERA VIEW */}
                        {captured ? (

                            <Image
                                source={{ uri: "file://" + captured.path }}
                                className="w-full h-[420px]"
                            />

                        ) : device && hasCameraPermission && !isInitializing ? (

                            <Camera
                                key={cameraPosition}   // 👈 YE MISSING HAIi
                                ref={cameraRef}
                                style={{ width: "100%", height: 420 }}
                                device={device}
                                isActive={isActive && isFocused}
                                photo={true}
                                onInitialized={() => setIsCameraReady(true)}
                            />

                        ) : (
                            <>
                                <View className="w-full h-[420px] bg-gray-200 items-center justify-center">

                                    {/* Fake Camera Image */}
                                    <Image
                                        source={{
                                            uri: "https://randomuser.me/api/portraits/women/44.jpg"
                                        }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />

                                    {/* Loading Overlay */}
                                    <View className="absolute inset-0 bg-black/30 items-center justify-center">

                                        {cameraDenied ? (

                                            <Text className="text-white">
                                                Camera permission required
                                            </Text>

                                        ) : loading ? (

                                            <Text className="text-white">
                                                Fetching location...
                                            </Text>

                                        ) : isInitializing ? (

                                            <Text className="text-white">
                                                Initializing Camera...
                                            </Text>

                                        ) : null}

                                    </View>

                                </View>

                                {/* Circle Overlay */}
                                <View className="absolute inset-0 items-center justify-center">
                                    <View className="w-[260px] h-[260px] rounded-full border-2 border-[#8B7AF0]" />
                                </View>

                            </>

                        )}


                        {/* Capture Button */}
                        <View className="absolute bottom-16 self-center">
                            <TouchableOpacity onPress={flipCamera} disabled={!device}  >
                                <View className="bg-white p-2 rounded-full">
                                    <View className="bg-accent w-12 h-12 rounded-full items-center justify-center">
                                        {/* <Icon name="aperture" color="white" size={20} /> */}

                                        <MaterialCommunityIcons
                                            name="camera-flip-outline"
                                            size={22}
                                            color="white"
                                        />

                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>


                        {/* Bottom Info */}
                        <View className="absolute bottom-3 left-3 right-3 flex-row justify-between items-end">

                            <View className="flex-1 mr-2">
                                <Text className="text-white text-sm">
                                    📍 {loading ? "Getting location..." : "Current Location"}
                                </Text>

                                {loading && (
                                    <View className="mt-1 w-2 h-2 bg-white rounded-full" />
                                )}

                                <Text
                                    numberOfLines={2}
                                    className="text-white text-xs opacity-80"
                                >
                                    {loading
                                        ? "Fetching location..."
                                        : address
                                            ? address
                                            : location
                                                ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                                                : "Fetching..."
                                    }
                                </Text>
                            </View>

                            <View className="items-end">
                                <Text className="text-white text-xl font-semibold">
                                    {formattedTime}
                                </Text>

                                <Text className="text-white text-xs opacity-80">
                                    {formattedDate}
                                </Text>
                            </View>

                        </View>

                    </View>
                </View>


                {/* Success Card */}
                {captured && <>
 
                    <Animated.View
                        entering={FadeIn}
                        exiting={FadeOut}
                        className="mx-4 mt-4 bg-white p-3 rounded-2xl flex-row items-center border border-gray-100"
                        style={cardStyle}
                    >
                        {/* Image */}
                        <Image
                            source={{ uri: "file://" + captured.path }}
                            className="w-14 h-14 rounded-xl"
                        />

                        {/* Text Section */}
                        <View className="flex-1 ml-3">

                            <View className="flex-row items-center">
                                <Icon
                                    name="check-circle"
                                    size={16}
                                    color="#16A34A"
                                />

                                <Text className="text-[15px] text-green-600 font-semibold ml-1 " style={{ includeFontPadding: false }}>
                                    Capture Successful
                                </Text>
                            </View>

                            <Text className="text-gray-500 text-xs mt-[2px]">
                                Face identity verified
                            </Text>

                            <Text className="text-gray-400 text-xs">
                                98.4% match
                            </Text>

                        </View>

                        {/* Retake */}
                        <TouchableOpacity
                            onPress={() => {
                                abort(); // cancel api
                                takingRef.current = false;
                                setCaptured(null);
                                setApiType(null);
                            }}
                            className="flex-row items-center "
                        >
                            <Icon
                                name="rotate-ccw"
                                size={18}
                                color="#2E7BEF"
                            />

                            <Text className="text-[#2E7BEF] text-sm font-medium ml-1 ">
                                Retake
                            </Text>

                        </TouchableOpacity>







                    </Animated.View>

                    <View className="flex-row px-4 mt-4 items-center">

                        {/* Check In */}
                        <TouchableOpacity
                            onPress={handleCheckIn}
                            disabled={ApiLoading}
                            className={`flex-1 rounded-3xl p-5 mr-2 flex-row items-center
${ApiLoading ? "bg-gray-400" : "bg-accent"}
`}
                        >

                            <View className="bg-white/20 p-2 rounded-xl mr-3">
                                <MaterialCommunityIcons
                                    name="login"
                                    size={22}
                                    color="white"
                                />
                            </View>

                            <Text
                                className="text-white font-medium text-md flex-1"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {ApiLoading && ApiType == "check-in"
                                    ? "Checking In..."
                                    : "Check-In"}
                            </Text>

                        </TouchableOpacity>


                        {/* Check Out */}
                        <TouchableOpacity
                            onPress={handleCheckOut}
                            disabled={ApiLoading}
                            className={`flex-1 rounded-3xl p-5 ml-2 flex-row items-center border
${ApiLoading ? "bg-gray-200 border-gray-200" : "bg-white border-gray-200"}
`}
                        >

                            <View className="bg-gray-100 p-2 rounded-xl mr-3">
                                <MaterialCommunityIcons
                                    name="logout"
                                    size={22}
                                    color="#6B7280"
                                />
                            </View>

                            <Text
                                className="text-gray-600 font-medium text-md flex-1"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {ApiLoading && ApiType == "check-out"
                                    ? "Check Out..."
                                    : "Check-Out"}
                            </Text>

                        </TouchableOpacity>

                    </View>
                </>

                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default FacialVerificationScreen;