import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Animated, {
FadeInDown,
FadeOutUp,
 
LinearTransition
} from "react-native-reanimated";

const LeaveSuccessCard = ({
message,
subMessage = "Scroll down to view request summary"
}) => {

return (

<Animated.View
entering={FadeInDown.springify()}
exiting={FadeOutUp}
layout={LinearTransition.duration(200)}
className="bg-green-50 border border-[#17B608] rounded-2xl p-4 mt-5"
>

<View className="flex-row items-center gap-3">

<View className="p-3 rounded-full border-2 border-[#1E8C0F]">

<Ionicons
name="checkmark"
size={25}
color="#1E8C0F"
/>

</View>

<View className="flex-1">

<Text
className="text-[#1E8C0F] font-semibold"
style={{ includeFontPadding:false }}
>

{message || "Your Leave Request has been Submitted"}

</Text>

<Text
className="text-green-600 text-xs mt-1"
style={{ includeFontPadding:false }}
>

{subMessage}

</Text>

</View>

</View>

</Animated.View>

)

}

export default LeaveSuccessCard