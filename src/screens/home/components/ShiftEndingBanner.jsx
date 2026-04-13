import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const ShiftEndingBanner = ({ navigation }) => {

    const {
        checkInTime,
        checkOutTime
    } = useSelector(
        state => state.todayAttendance
    );


    // 6:30 PM Check
    const showReminder = useMemo(() => {

        const now = dayjs();

        const sixThirty = dayjs()
            .hour(18)
            .minute(30)
            .second(0);

        return (
            checkInTime &&
            !checkOutTime &&
            now.isAfter(sixThirty)
        )

    }, [checkInTime, checkOutTime]);


    // Important
  if (!showReminder) return null;


    return (

        <View
            className="mx-5 mt-3 px-5 py-5 rounded-3xl"
            style={{ backgroundColor: "#A67C52" }}
        >

            {/* Top Section */}
            <View className="flex-row items-start">

                <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center">

                    <View className="bg-white w-9 h-9 rounded-full items-center justify-center">

                        <MaterialCommunityIcons
                            name="clock-alert-outline"
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
                        Shift Reminder
                    </Text>

                    <Text
                        className="text-white text-2xl font-bold mt-[2px]"
                        style={{ includeFontPadding: false }}
                    >
                        Shift Ending Soon
                    </Text>

                    <Text
                        className="text-white/90 text-[12px] mt-2 leading-5"
                        style={{ includeFontPadding: false }}
                    >

                        According to company policy, your shift duration is nearing completion.
                        Please proceed to check out once your work hours are fulfilled.

                    </Text>

                </View>

            </View>


            <TouchableOpacity
                onPress={() => navigation.navigate("Atendence")}
                className="bg-white py-4 rounded-2xl mt-4 flex-row items-center justify-center"
            >

                <MaterialCommunityIcons
                    name="logout"
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

                    Check Out Now

                </Text>

            </TouchableOpacity>

        </View>

    );

};

export default ShiftEndingBanner;