import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

import { Camera, useCameraDevice, useCameraDevices } from "react-native-vision-camera";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useCurrentLocation } from '../../hooks/useCurrentLocation'

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useCameraPermission } from "../../hooks/useCameraPermission";
const { width } = Dimensions.get("window");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import { useMarkAttendanceMutation } from "../../redux/features/attendance/attendanceApi";

import useHandleMutation from "../../hooks/useHandleMutation";
import AttendanceSuccessScreen from './AttendanceSuccessScreen'
import { getAuth } from "../../utils/authStorage";

const FacialVerificationScreen = ({ navigation }) => {


    const [markAttendance] = useMarkAttendanceMutation();
    const { handleMutation, loading: ApiLoading } = useHandleMutation();



    const device = useCameraDevice("front");

    const [isCameraReady, setIsCameraReady] = useState(false);
    const { location, getCurrentLocation, loading, address } = useCurrentLocation();

    const [ApiType, setApiType] = useState(null);

    const [isInitializing, setIsInitializing] = useState(true);
    const {
        hasCameraPermission,
        cameraDenied,
        requestCameraPermission
    } = useCameraPermission();


    const cameraRef = useRef(null);

    const [captured, setCaptured] = useState(null);
    const [time, setTime] = useState(new Date());

    // Dynamic Time
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (!location && !loading) {
            getCurrentLocation();
        }
    }, []);


    useFocusEffect(
        useCallback(() => {

            const init = async () => {

                setIsInitializing(true);

                const camera = await requestCameraPermission();

                if (!camera) {
                    setIsInitializing(false);
                    return;
                }




                setIsInitializing(false);

            };

            init();

        }, [])
    );


    const takePhoto = async () => {
        if (!cameraRef.current || !isCameraReady) {
            console.log("Camera not ready");
            return;
        }


        const photo = await cameraRef.current.takePhoto({
            flash: "off",
        });

        setCaptured(photo);
        if (!location) {
            await getCurrentLocation();
        }

    };




    const handleCheckIn = async () => {
        setApiType('check-in')
        const auth = await getAuth();

        const res = await handleMutation({
            apiFunc: markAttendance,
            params: {
                empId: auth?.user?.empId,
                name: auth?.user?.name,
                type: "in",
                location: `${location.latitude},${location.longitude}`,
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

        //      navigation.reset({
        //   index: 1,
        //   routes: [
        //     {
        //       name: "Tabs",
        //       params: { screen: "Home" }
        //     },
        //     {
        //       name: "attendance-mark-success",
        //       params: {
        //         type: "out",
        //         time: formattedTime,
        //         location: address
        //       }
        //     }
        //   ]
        // });



        setApiType('check-out')
        const auth = await getAuth();

        const res = await handleMutation({
            apiFunc: markAttendance,
            params: {
                empId: auth?.user?.empId,
                name: auth?.user?.name,
                type: "out",
                location: `${location.latitude},${location.longitude}`,
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


        };

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
                <View className="mx-4 mt-2 rounded-3xl overflow-hidden bg-white shadow-sm border">
                    <View className="relative border">

                        {/* CAMERA VIEW */}
                        {captured ? (

                            <Image
                                source={{ uri: "file://" + captured.path }}
                                className="w-full h-[420px]"
                            />

                        ) : device && hasCameraPermission && !isInitializing ? (

                            <Camera
                                ref={cameraRef}
                                style={{ width: "100%", height: 420 }}
                                device={device}
                                isActive={true}
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
                            <TouchableOpacity onPress={takePhoto} disabled={!isCameraReady}  >
                                <View className="bg-white p-3 rounded-full">
                                    <View className="bg-accent w-12 h-12 rounded-full items-center justify-center">
                                        <Icon name="aperture" color="white" size={20} />
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
                        className="mx-4 mt-4 bg-white p-3 rounded-2xl flex-row items-center shadow-sm"
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
                            onPress={() => setCaptured(null)}
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