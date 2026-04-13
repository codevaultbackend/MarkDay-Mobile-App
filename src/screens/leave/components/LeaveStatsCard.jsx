import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolate
} from "react-native-reanimated";

import { cardStyle } from "../../../utils/cardStyle";

const { width } = Dimensions.get("window")


/*
============================================
Text Style (Cross Platform Fix)
============================================
*/

const numberText = {
    includeFontPadding: false,
    lineHeight: 22,
    textAlign: "center"
}

const labelText = {
    includeFontPadding: false,
    lineHeight: 14,
    marginTop: 8,
    textAlign: "center"
}


/*
============================================
Shimmer Component
============================================
*/

const Shimmer = ({ width = 60, height = 16 }) => {

    const translateX = useSharedValue(-width)

    useEffect(() => {

        translateX.value = withRepeat(
            withTiming(width, { duration: 1000 }),
            -1,
            false
        )

    }, [])

    const animatedStyle = useAnimatedStyle(() => {

        return {
            transform: [
                {
                    translateX: interpolate(
                        translateX.value,
                        [-width, width],
                        [-width, width]
                    )
                }
            ]
        }

    })

    return (

        <View
            style={{
                width,
                height,
                backgroundColor: "#E5E7EB",
                overflow: "hidden",
                borderRadius: 6
            }}
        >

            <Animated.View
                style={[
                    {
                        width: width,
                        height: height,
                        backgroundColor: "#F3F4F6",
                        position: "absolute"
                    },
                    animatedStyle
                ]}
            />

        </View>

    )

}



/*
============================================
Main Component
============================================
*/

const LeaveStatsCard = ({ leaves, loading, leaveError }) => {

    const paid = leaves?.paidLeave || {}

    return (

        <View
            style={cardStyle}
            className="bg-white rounded-3xl p-4 mt-5"
        >

            <View className="flex-row justify-between">

                {/* ================= Total ================= */}

                <View className="flex-1 items-center">

                    {(loading || leaveError) ? (
                        <>
                            <Shimmer width={60} height={18} />
                            <View className="h-1" />
                            <Shimmer width={100} height={12} />
                        </>
                    ) : (
                        <>
                            <Text
                                className="text-lg font-semibold"
                                style={numberText}
                            >
                                {paid?.total || 0} Days
                            </Text>

                            <Text
                                className="text-xs text-gray-400"
                                style={labelText}
                            >
                                Total Paid Leaves
                            </Text>
                        </>
                    )}

                </View>


                <View className="w-px bg-gray-200" />


                {/* ================= Used ================= */}

                <View className="flex-1 items-center">

                    {(loading || leaveError) ? (
                        <>
                            <Shimmer width={60} height={18} />
                            <View className="h-1" />
                            <Shimmer width={90} height={12} />
                        </>
                    ) : (
                        <>
                            <Text
                                className="text-lg font-semibold"
                                style={numberText}
                            >
                                {paid?.used || 0} Days
                            </Text>

                            <Text
                                className="text-xs text-gray-400"
                                style={labelText}
                            >
                                Used Leaves
                            </Text>
                        </>
                    )}

                </View>


                <View className="w-px bg-gray-200" />


                {/* ================= Remaining ================= */}

                <View className="flex-1 items-center">

                    {(loading || leaveError) ? (
                        <>
                            <Shimmer width={60} height={18} />
                            <View className="h-1" />
                            <Shimmer width={110} height={12} />
                        </>
                    ) : (
                        <>
                            <Text
                                className="text-lg font-semibold"
                                style={numberText}
                            >
                                {paid?.remaining || 0} Days
                            </Text>

                            <Text
                                className="text-xs text-gray-400"
                                style={labelText}
                            >
                                Remaining Leaves
                            </Text>
                        </>
                    )}

                </View>

            </View>

        </View>

    )

}

export default LeaveStatsCard