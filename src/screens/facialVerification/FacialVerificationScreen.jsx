import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

const FacialVerificationScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-primary">

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
            <View className="mx-4 mt-2 rounded-3xl overflow-hidden bg-white shadow-sm">

                <View className="relative">

                    <Image
                        source={{
                            uri: "https://randomuser.me/api/portraits/women/44.jpg",
                        }}
                        className="w-full h-[420px]"
                        resizeMode="cover"
                    />

                    {/* Circle Overlay */}
                    <View className="absolute inset-0 items-center justify-center">
                        <View className="w-[260px] h-[260px] rounded-full border-2 border-[#8B7AF0]" />
                    </View>

                    {/* Scan Button */}
                    <View className="absolute bottom-16 self-center">
                        <View className="bg-white p-3 rounded-full">
                            <View className="bg-accent w-12 h-12 rounded-full items-center justify-center">
                                <Icon name="aperture" color="white" size={20} />
                            </View>
                        </View>
                    </View>


                    {/* Bottom Info */}
                    <View className="absolute bottom-3 left-3 right-3 flex-row justify-between items-end">

                        <View>
                            <Text className="text-white text-sm">
                                📍 SAN FRANCISCO, CA
                            </Text>

                            <Text className="text-white text-xs opacity-80">
                                37.7749° N, 122.4194° W
                            </Text>
                        </View>

                        <View className="items-end">
                            <Text className="text-white text-xl font-semibold">
                                09:15 AM
                            </Text>

                            <Text className="text-white text-xs opacity-80">
                                Monday, Oct 23
                            </Text>
                        </View>

                    </View>

                </View>

            </View>


            {/* Capture Success Card */}

            <View className="mx-4 mt-4 bg-white p-4 rounded-2xl flex-row items-center shadow-sm">

                <Image
                    source={{
                        uri: "https://randomuser.me/api/portraits/women/44.jpg",
                    }}
                    className="w-12 h-12 rounded-xl"
                />

                <View className="flex-1 ml-3">
                    <Text className="text-green-600 font-medium">
                        ✓ Capture Successful
                    </Text>

                    <Text className="text-gray-500 text-sm">
                        Face identity verified
                    </Text>

                    <Text className="text-gray-400 text-xs">
                        98.4% match
                    </Text>
                </View>

                <TouchableOpacity>
                    <Text className="text-blue-500 font-medium">
                        Retake
                    </Text>
                </TouchableOpacity>

            </View>



            {/* Check In / Check Out */}

            <View className="flex-row mx-4 mt-6 gap-3">

                <TouchableOpacity className="flex-1 bg-accent py-4 rounded-2xl flex-row justify-center items-center">
                    <Icon name="log-in" size={18} color="white" />

                    <Text className="text-white ml-2 font-medium">
                        Check-In
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity className="flex-1 bg-gray-200 py-4 rounded-2xl flex-row justify-center items-center">
                    <Icon name="log-out" size={18} color="#666" />

                    <Text className="text-gray-600 ml-2 font-medium">
                        Check-Out
                    </Text>
                </TouchableOpacity>

            </View>



            {/* Bottom Navigation Space */}
            <View className="flex-1" />



            {/* Floating Scan Button */}

            <View className="absolute bottom-6 self-center">
                <View className="bg-accent w-16 h-16 rounded-full items-center justify-center shadow-lg">
                    <Icon name="maximize" color="white" size={22} />
                </View>
            </View>


        </SafeAreaView>
    );
};

export default FacialVerificationScreen;