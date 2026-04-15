import React, { useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

const ShiftEndingBanner = ({ navigation }) => {

    const { checkInTime, checkOutTime } = useSelector(
        state => state.todayAttendance
    );

    const [currentTime, setCurrentTime] = React.useState(dayjs());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs());
        }, 60000); // ✅ 1 minute

        return () => clearInterval(interval);
    }, []);

    const showReminder = useMemo(() => {

        const sixThirty = dayjs()
            .hour(18)
            .minute(30)
            .second(0);

        return (
            checkInTime &&
            !checkOutTime &&
            currentTime.isSameOrAfter(sixThirty)
        );

    }, [checkInTime, checkOutTime, currentTime]);

    if (!showReminder) return null;

    return (
        <View
            className="mx-5 mt-3 px-5 py-5 rounded-3xl"
            style={{ backgroundColor: "#A67C52" }}
        >
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
                    <Text className="text-white text-sm">
                        Shift Reminder
                    </Text>

                    <Text className="text-white text-2xl font-bold mt-[2px]">
                        Shift Ending Soon
                    </Text>

                    <Text className="text-white/90 text-[12px] mt-2 leading-5">
                        According to company policy, your shift duration is nearing completion.
                        Please proceed to check out once your work hours are fulfilled.
                    </Text>
                </View>

            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate("Atendence")}
                className="bg-white py-3 rounded-2xl mt-4 flex-row items-center justify-center"
            >
                <MaterialCommunityIcons
                    name="logout"
                    size={20}
                    color="#A67C52"
                />

                <Text className="text-base font-semibold ml-2" style={{ color: "#A67C52" }}>
                    Check Out Now
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ShiftEndingBanner;