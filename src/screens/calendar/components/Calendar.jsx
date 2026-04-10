import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import CalendarSkeleton from "./CalendarSkeleton";

import Animated, {
    FadeIn,
    LinearTransition
} from "react-native-reanimated";

import { cardStyle } from '../../../utils/cardStyle'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Calendar = ({
    selectedDate,
    setSelectedDate,
    data,
    empId,
    leaves,
    holidays,
    loading
}) => {

    const today = dayjs();
    const [currentMonth, setCurrentMonth] = useState(today);

    const startOfMonth = currentMonth.startOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = currentMonth.daysInMonth();

    const dates = useMemo(() => {

        const blanks = Array.from({ length: startDay }, () => null);

        const days = Array.from({ length: daysInMonth }, (_, i) =>
            currentMonth.date(i + 1)
        );

        return [...blanks, ...days];

    }, [currentMonth]);


    // Present Dates
    const presentDates = data
        ?.filter(item => item?.inTime)
        ?.map(item => item.date);


    // Leave Dates
    const leaveDates = useMemo(() => {

        if (!leaves?.leaves) return [];

        let arr = [];

        leaves.leaves
            .filter(l => l.status?.toLowerCase() === "approved")
            .forEach(leave => {

                let start = dayjs(leave.startDate);
                let end = dayjs(leave.endDate);

                while (start.isBefore(end) || start.isSame(end)) {
                    arr.push(start.format("M/D/YYYY"));
                    start = start.add(1, "day");
                }

            });

        return arr;

    }, [leaves]);


    // Holiday Dates
    const holidayDates = useMemo(() => {

        if (!holidays) return [];

        return holidays.map(item =>
            dayjs(item.date).format("M/D/YYYY")
        );

    }, [holidays]);


    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    if (loading) {
        return <CalendarSkeleton />
    }


    return (

        <Animated.View
            layout={LinearTransition.springify()}
            style={cardStyle}
            className="bg-white rounded-3xl mt-5 p-4 border border-gray-100"
        >

            {/* Header */}

            <View className="flex-row justify-center items-center mb-3">

                <Text
                    className="text-md font-semibold text-secondary"
                    style={{ includeFontPadding: false }}
                >
                    {currentMonth.format("MMMM YYYY")}
                </Text>

            </View>


            <View className="border-b border-gray-200 mb-2" />


            {/* Week Days */}

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}
            >
                {weekDays.map((day) => (

                    <View
                        key={day}
                        style={{
                            width: "14.285%",
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            className="text-xs text-gray-500"
                            style={{ includeFontPadding: false }}
                        >
                            {day}
                        </Text>

                    </View>

                ))}
            </View>


            {/* Dates */}

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}
            >

                {dates.map((date, index) => {

                    if (!date) {
                        return (
                            <View
                                key={index}
                                style={{
                                    width: "14.285%",
                                    height: 48
                                }}
                            />
                        );
                    }

                    const formatted = date.format("M/D/YYYY");

                    const isSelected = formatted === selectedDate;
                    const isPresent = presentDates?.includes(formatted);
                    const isLeave = leaveDates?.includes(formatted);
                    const isHoliday = holidayDates?.includes(formatted);

                    const isFuture = date.isAfter(today, "day");
                    const isToday = date.isSame(today, "day");


                    let dotColor = "";

                    if (isPresent) dotColor = "bg-green-500";
                    else if (isLeave) dotColor = "bg-yellow-500";
                    else if (isHoliday) dotColor = "bg-blue-500";
                    else if (!isFuture && !isToday) dotColor = "bg-red-500";


                    return (
                        <View
                            style={{
                                width: "14.285%",
                                padding: 2
                            }}
                        >
                            <AnimatedTouchable
                                entering={FadeIn.delay(index * 15)}
                                key={formatted}
                                disabled={isFuture}
                                onPress={() => setSelectedDate(formatted)}

                                style={{
                                    height: 44,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}

                                className={`
                                rounded-xl
                                ${isSelected ? "bg-gray-100" : ""}
                                
                                ${isToday ? "border-2 border-accent" : ""}
                            `}
                            >

                                {/* Date */}

                                <Text
                                    className={`
                                text-sm
                                ${isToday
                                            ? "font-semibold text-accent"
                                            : "text-secondary"}
                                ${isFuture ? "text-gray-300" : "text-secondary"}
                                        `

                                    }
                                    style={{ includeFontPadding: false }}
                                >
                                    {date.date()}
                                </Text>


                                {/* Dot */}

                                {!isFuture && (
                                    <Animated.View
                                        entering={FadeIn.delay(index * 20)}
                                        className={`w-1.5 h-1.5 rounded-full mt-1 ${dotColor}`}
                                    />
                                )}

                            </AnimatedTouchable>
                        </View>
                    );

                })}

            </View>

        </Animated.View>

    );

};

export default Calendar;