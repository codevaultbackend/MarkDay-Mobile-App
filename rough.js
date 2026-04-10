<View className="mt-4">

    <Text
        className="text-gray-400 text-xs"
        style={{ includeFontPadding: false }}
    >
        Leave Type
    </Text>

    <View className="bg-gray-100 rounded-xl p-4 mt-1">

        <View className="flex-row justify-between items-center">

            <Text
                className={`
text-md capitalize
${leaveStatus === "approved" && "text-green-600"}
${leaveStatus === "pending" && "text-yellow-600"}
${leaveStatus === "rejected" && "text-red-600"}
`}
                style={{ includeFontPadding: false }}
            >
                {leaveStatus || "None"}
            </Text>

            {attendance?.inTime && leaveStatus && (
                <View className="bg-green-100 px-2 py-1 rounded-md">
                    <Text
                        className="text-green-600 text-xs"
                        style={{ includeFontPadding: false }}
                    >
                        Present
                    </Text>
                </View>
            )}

        </View>

    </View>

</View>
