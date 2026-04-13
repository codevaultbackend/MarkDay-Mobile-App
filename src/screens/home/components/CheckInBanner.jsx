import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CheckInBanner = ({ navigation }) => {

    return (

        <View
            className="mx-5 mt-4 px-5 py-5 rounded-3xl"
            style={{ backgroundColor: "#A67C52" }}
        >

            <View className="flex-row items-start">

                <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center">

                    <View className="bg-white w-9 h-9 rounded-full items-center justify-center">
                        <MaterialCommunityIcons
                            name="timer-outline"
                            size={20}
                            color="#A67C52"
                        />
                    </View>

                </View>

                <View className="ml-3 flex-1">

                    <Text
                        className="text-white text-sm"
                        style={{ includeFontPadding: false }}
                    >
                        Current Status
                    </Text>

                    <Text
                        className="text-white text-2xl font-bold mt-[2px]"
                        style={{ includeFontPadding: false }}
                    >
                        Not Checked In
                    </Text>

                    <Text
                        className="text-white/90 text-[12px] mt-2 leading-5"
                        style={{ includeFontPadding: false }}
                    >
                        You haven't recorded your attendance for today.
                        Please check in to start your shift
                    </Text>

                </View>

            </View>


            <TouchableOpacity
                onPress={() => navigation.navigate("Atendence")}
                className="bg-white py-4 rounded-2xl mt-4 flex-row items-center justify-center"
            >

                <MaterialCommunityIcons
                    name="login"
                    size={20}
                    color="#A67C52"
                />

                <Text
                    className="text-base font-semibold ml-2"
                    style={{
                        color: "#A67C52",
                        includeFontPadding: false
                    }}
                >
                    Check In Now
                </Text>

            </TouchableOpacity>

        </View>

    );

};

export default CheckInBanner;