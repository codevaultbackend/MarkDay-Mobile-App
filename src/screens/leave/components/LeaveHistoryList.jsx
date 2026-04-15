import React, { useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import dayjs from "dayjs";

import LeaveHistorySkeleton from "./LeaveHistorySkeleton";
import RetryScreen from "../../calendar/components/RetryScreen";
import { cardStyle } from "../../../utils/cardStyle";

const LeaveHistoryList = ({ leaves, loading, error, refetch }) => {
     

    /*
    ============================================
    Loading State
    ============================================
    */
    if (error) {
        return (
            <View
                style={{ flex: 1, minHeight: 450 }}
                className="w-full justify-center items-center"
            >
                <RetryScreen
                    onRetry={refetch}
                    error={error}
                />
            </View>
        )
    }
    if (loading) {
        return <LeaveHistorySkeleton />
    }

    /*
    ============================================
    Error State
    ============================================
    */



    /*
    ============================================
    Render Each Leave Card
    useCallback for performance optimization
    ============================================
    */
    const renderItem = useCallback(({ item }) => {

        // Leave Status
        const status = item.status

        // Calculate Total Days
        const totalDays =
            dayjs(item.endDate)
                .diff(dayjs(item.startDate), "day") + 1

        return (

            <View
                style={cardStyle}
                className="bg-white rounded-3xl p-4 mt-4  border border-gray-200"
            >

                {/* ================= Header ================= */}

                <View className="flex-row justify-between items-center">

                    {/* Leave ID */}

                    <Text className="font-semibold" style={{ includeFontPadding: false }}>
                        Leave Request ID #{item._id.slice(-5)}
                    </Text>


                    {/* Status Badge */}

                    <View
                        className={`
px-3 py-1 rounded-full
${status === "pending" && "bg-orange-100"}
${status === "approved" && "bg-green-100"}
${status === "rejected" && "bg-red-100"}
`}
                    >

                        <Text
                            style={{ includeFontPadding: false }}
                            className={`
text-xs capitalize
${status === "pending" && "text-orange-600"}
${status === "approved" && "text-green-600"}
${status === "rejected" && "text-red-600"}
`}
                        >
                            {status}
                        </Text>

                    </View>

                </View>


                {/* Applied Date */}

                <Text className="text-gray-400 text-xs mt-1" style={{ includeFontPadding: false }}>
                    Applied on {dayjs(item.appliedAt).format("MMM DD, YYYY")}
                </Text>


                {/* ================= Dates Section ================= */}

                <View className="flex-row justify-between mt-4">

                    {/* From Date */}

                    <View>
                        <Text className="text-xs text-gray-400" style={{ includeFontPadding: false }}>
                            From Date
                        </Text>

                        <Text className="font-medium" style={{ includeFontPadding: false }}>
                            {dayjs(item.startDate).format("DD/MM/YY")}
                        </Text>
                    </View>


                    {/* To Date */}

                    <View>
                        <Text className="text-xs text-gray-400" style={{ includeFontPadding: false }}>
                            To Date
                        </Text>

                        <Text className="font-medium" style={{ includeFontPadding: false }}>
                            {dayjs(item.endDate).format("DD/MM/YY")}
                        </Text>
                    </View>


                    {/* Total Days */}

                    <View>
                        <Text className="text-xs text-gray-400" style={{ includeFontPadding: false }}>
                            Total Days
                        </Text>

                        <Text className="font-medium" style={{ includeFontPadding: false }}    >
                            {totalDays} Days
                        </Text>
                    </View>

                </View>

            </View>

        )

    }, [])



    /*
    ============================================
    Empty State
    ============================================
    */
    const EmptyComponent = () => (

        <View className="bg-white rounded-3xl p-6 mt-4 items-center">

            <Text className="text-gray-400">
                No Leave Requests Found
            </Text>

        </View>

    )



    return (

        <View className="mt-3">

            {/* Title */}

            <Text className="text-lg font-semibold ">
                All Leave Requests
            </Text>


            {/* ================= FlatList ================= */}

            <FlatList

                data={leaves?.leaves || []}

                renderItem={renderItem}

                keyExtractor={(item) => item._id}

                ListEmptyComponent={EmptyComponent}

                showsVerticalScrollIndicator={false}

                scrollEnabled={false} // Important (Parent ScrollView fix)

                contentContainerStyle={{
                    paddingBottom: 20
                }}

                removeClippedSubviews={true}

                initialNumToRender={5}

                maxToRenderPerBatch={5}

                windowSize={5}

            />

        </View>

    )

}

export default React.memo(LeaveHistoryList)