import React from "react";
import { View, Text } from "react-native";
import { cardStyle } from "../../../utils/cardStyle";

const LeavePolicyCard = () => {

return (

<View
style={cardStyle}
className="bg-blue-50 border border-blue-200 rounded-3xl p-4 mt-5"
>

<Text className="text-md font-semibold text-secondary">
Leave Policy Information
</Text>

<View className="mt-3 gap-2">

<Text className="text-sm text-gray-500 font-normal" style={{includeFontPadding:false}}>
• All leave requests must be submitted at least 2 days in advance
</Text>

<Text className="text-sm text-gray-500 font-normal" style={{includeFontPadding:false}} >
• Emergency leaves can be applied on the same day
</Text>

<Text className="text-sm text-gray-500 font-normal" style={{includeFontPadding:false}} >
• Unpaid leaves will be granted if paid leave exhausted
</Text>

<Text className="text-sm text-gray-500 font-normal" style={{includeFontPadding:false}} >
• Leave approval typically takes 1-2 business days
</Text>

</View>

</View>

)

}

export default LeavePolicyCard