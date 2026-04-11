import React from "react";
import { View, Text } from "react-native";
import { cardStyle } from "../../../utils/cardStyle";

const LeaveStatsCard = () => {

return (

<View
style={cardStyle}
className="bg-white rounded-3xl p-4 mt-5"
>

<View className="flex-row justify-between">

<View className="flex-1 items-center">
<Text className="text-lg font-semibold">
10 Days
</Text>
<Text className="text-xs text-gray-400">
Total Paid Leaves
</Text>
</View>

<View className="w-px bg-gray-200" />

<View className="flex-1 items-center">
<Text className="text-lg font-semibold">
6 Days
</Text>
<Text className="text-xs text-gray-400">
Used Leaves
</Text>
</View>

<View className="w-px bg-gray-200" />

<View className="flex-1 items-center">
<Text className="text-lg font-semibold">
4 Days
</Text>
<Text className="text-xs text-gray-400">
Remaining Leaves
</Text>
</View>

</View>

</View>

)

}

export default LeaveStatsCard