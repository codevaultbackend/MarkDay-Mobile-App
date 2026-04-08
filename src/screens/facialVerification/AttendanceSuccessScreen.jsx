import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming
} from "react-native-reanimated";

import Icon from "react-native-vector-icons/Feather";

const AttendanceSuccessScreen = ({ route, navigation }) => {

    const { type, time, location } = route.params || {};

    const scale = useSharedValue(0.6);
    const opacity = useSharedValue(0);
    const ripple = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(1, {
            damping: 8,
            stiffness: 120
        });

        opacity.value = withTiming(1, { duration: 600 });

        ripple.value = withTiming(1, {
            duration: 900
        });

    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value
    }));

    const rippleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: ripple.value }],
        opacity: 0.6 - ripple.value * 0.2,
    }));

    return (

        <SafeAreaView className="flex-1 bg-primary">

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >

                <View className="px-5 flex-1 justify-between">

                    <View>

                        {/* Animated Tick */}
                        <View className="items-center mt-20">

                            <View className="items-center justify-center">

                                <Animated.View
                                    style={rippleStyle}
                                    className="absolute w-36 h-36 rounded-full bg-green-200"
                                />

                                <Animated.View
                                    style={animatedStyle}
                                    className="w-28 h-28 rounded-full bg-green-500 items-center justify-center"
                                >
                                    <Icon name="check" size={42} color="white" />
                                </Animated.View>

                            </View>

                        </View>

                        {/* Title */}
                        <Text className="text-center text-xl font-semibold mt-10 text-secondary">
                            {type === "out"
                                ? "Check-out Successful"
                                : "Check-in Successful"}
                        </Text>

                        <Text className="text-center text-gray-500 mt-2 px-6">
                            Your attendance has been recorded for today's shift
                        </Text>


                        {/* Card Section */}
                        <View className="mt-10">

                            {/* Time Card */}
                            <View className="bg-white rounded-2xl p-4 flex-row items-center mb-4 shadow-sm">

                                <View className="bg-accent w-10 h-10 rounded-full items-center justify-center mr-3">
                                    <Icon name="arrow-down-left" size={18} color="white" />
                                </View>

                                <View>
                                    <Text className="text-gray-400 text-xs" style={{ includeFontPadding: false }}>
                                        {type === "out"
                                            ? "CHECK-OUT TIME"
                                            : "CHECK-IN TIME"}
                                    </Text>

                                    <Text className="text-secondary text-lg font-semibold">
                                        {time}
                                    </Text>
                                </View>

                            </View>


                            {/* Location Card */}
                            <View className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm">

                                <View className="bg-accent w-10 h-10 rounded-full items-center justify-center mr-3">
                                    <Icon name="map-pin" size={18} color="white" />
                                </View>

                                <View className="flex-1">
                                    <Text className="text-gray-400 text-xs">
                                        LOCATION
                                    </Text>

                                    <Text
                                        className="text-secondary text-md font-medium"
                                        numberOfLines={2}
                                    >
                                        {location}
                                    </Text>
                                </View>

                            </View>

                        </View>

                    </View>


                    {/* Button */}
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Tabs", params: { screen: "Home" } }],
                            });
                        }}
                        className="bg-accent h-[56px] rounded-2xl items-center justify-center mb-5 mt-10"
                    >
                        <Text className="text-white text-base font-medium">
                            Back to Home
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </SafeAreaView>

    );

};

export default AttendanceSuccessScreen;