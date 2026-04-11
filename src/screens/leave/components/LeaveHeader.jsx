import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const LeaveHeader = ({ navigation }) => {

return (

<View className="flex-row items-center justify-between mt-4">

<TouchableOpacity
onPress={() => navigation.goBack()}
className="w-8"
>
<Ionicons
name="chevron-back"
size={24}
color="#1F2937"
/>
</TouchableOpacity>

<Text
className="text-lg font-semibold flex-1 text-center"
style={{ includeFontPadding:false }}
>
Leave Management
</Text>

<View className="w-8" />

</View>

)

}

export default LeaveHeader