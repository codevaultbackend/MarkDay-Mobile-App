 


import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDatePicker = ({
visible,
date,
onConfirm,
onCancel
}) => {

const [tempDate, setTempDate] = useState(date);

return (

<Modal
visible={visible}
transparent
animationType="slide"
>

<View className="flex-1 justify-end bg-black/40">

<View className="bg-white rounded-t-3xl p-5">

{/* Header */}

<View className="flex-row justify-between mb-3">

<TouchableOpacity onPress={onCancel}>
<Text className="text-gray-500 font-normal" style={{includeFontPadding:false}}>
Cancel
</Text>
</TouchableOpacity>

<Text className="font-semibold text-secondary">
Select Date
</Text>

<TouchableOpacity
onPress={()=>{
onConfirm(tempDate)
}}
>
<Text className="text-accent font-semibold">
Confirm
</Text>
</TouchableOpacity>

</View>

<DateTimePicker
value={tempDate}
mode="date"
display="spinner"
onChange={(event , selectedDate)=>{
if(selectedDate){
setTempDate(selectedDate)
}
}}
/>

</View>

</View>

</Modal>

)

}

export default CustomDatePicker