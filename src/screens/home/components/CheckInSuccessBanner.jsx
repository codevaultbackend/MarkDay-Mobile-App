import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
    FadeInDown,
    FadeOutUp
} from "react-native-reanimated";

const CheckInSuccessBanner = () => {

    const [show, setShow] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setShow(false)
        }, 30 * 60 * 1000);

        return () => clearTimeout(timer)

    }, []);

    if (!show) return null;

    return (

        <Animated.View
            entering={FadeInDown.duration(400)}
            exiting={FadeOutUp.duration(400)}
            className="mx-5 mt-4 px-5 py-5 rounded-3xl"
            style={{ backgroundColor: "#A67C52" }}
        >

            <View className="flex-row items-start">

                <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center">

                    <View className="bg-white w-9 h-9 rounded-full items-center justify-center">

                        <MaterialCommunityIcons
                            name="check"
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
                        Attendance Updated
                    </Text>

                    <Text
                        className="text-white text-2xl font-bold mt-[2px]"
                        style={{ includeFontPadding: false }}
                    >
                        Checked In Successfully
                    </Text>

                    <Text
                        className="text-white/90 text-[12px] mt-2 leading-5"
                        style={{ includeFontPadding: false }}
                    >
                        Your work duration has started. Have a productive day.
                    </Text>

                </View>

            </View>

        </Animated.View>

    );

};

export default CheckInSuccessBanner;