import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import Animated, {
    FadeInDown,
    FadeOutUp
} from "react-native-reanimated";
import dayjs from "dayjs";

const HomeStatusBanner = ({ navigation }) => {

    const { checkInTime } = useSelector(
        state => state.todayAttendance
    );

    const [showBanner, setShowBanner] = useState(true);


    // 30 min hide logic
    useEffect(() => {

        if (!checkInTime) {
            setShowBanner(true);
            return;
        }

        const checkin = dayjs(checkInTime, "h:mm A");
        const now = dayjs();

        const diff = now.diff(checkin, "minute");

        if (diff >= 30) {
            setShowBanner(false);
            return;
        }

        const timeout = setTimeout(() => {
            setShowBanner(false);
        }, (30 - diff) * 60 * 1000);

        return () => clearTimeout(timeout);

    }, [checkInTime]);


    const showCheckin = !checkInTime;

    if (!showBanner && !showCheckin) return null;


    return (

        <Animated.View
            entering={FadeInDown.duration(400)}
            exiting={FadeOutUp.duration(400)}
            className="mx-5 mt-4 px-5 py-5 rounded-3xl"
            style={{ backgroundColor: "#A67C52" }}
        >

            {/* Top Section */}

            <View className="flex-row flex-start">

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
                        {showCheckin ? "Not Checked In" : "Checked In"}
                    </Text>

                    <Text
                        className="text-white/90 text-[12px] mt-2 leading-5"
                        style={{ includeFontPadding: false }}
                    >

                        {showCheckin
                            ? "You haven't recorded your attendance for today. Please check in to start your shift"
                            : "You have checked in successfully. Your work duration is running"
                        }

                    </Text>

                </View>

            </View>


            {showCheckin && (

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

            )}

        </Animated.View>

    );

};

export default HomeStatusBanner;