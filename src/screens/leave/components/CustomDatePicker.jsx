// import React, { useState, useMemo } from "react";
// import { View, Text, TouchableOpacity, Modal } from "react-native";
// import ScrollPicker from "react-native-wheel-scrollview-picker";
// import dayjs from "dayjs";

// const months = [
// "Jan","Feb","Mar","Apr","May","Jun",
// "Jul","Aug","Sep","Oct","Nov","Dec"
// ];

// const years = Array.from({ length: 10 }, (_, i) => 2024 + i);
// const days = Array.from({ length: 31 }, (_, i) => i + 1);

// const CustomDatePicker = ({
// visible,
// onClose,
// onConfirm,
// defaultDate
// }) => {

// const date = dayjs(defaultDate);

// const [day , setDay] = useState(date.date()-1);
// const [month , setMonth] = useState(date.month());
// const [year , setYear] = useState(years.indexOf(date.year()));

// const handleConfirm = () => {

// const selectedDate = dayjs()
// .year(years[year])
// .month(month)
// .date(day+1)
// .toDate();

// onConfirm(selectedDate);
// onClose();

// };

// return (

// <Modal
// visible={visible}
// transparent
// animationType="slide"
// >

// <View className="flex-1 justify-end bg-black/40">

// <View className="bg-white rounded-t-3xl p-5">

// {/* Header */}

// <View className="flex-row justify-between mb-4">

// <TouchableOpacity onPress={onClose}>
// <Text className="text-gray-500">Cancel</Text>
// </TouchableOpacity>

// <Text className="font-semibold">
// Select Date
// </Text>

// <TouchableOpacity onPress={handleConfirm}>
// <Text className="text-accent font-semibold">
// Confirm
// </Text>
// </TouchableOpacity>

// </View>


// {/* Picker */}

// <View className="flex-row justify-between">

// {/* Month */}

// <ScrollPicker
// dataSource={months}
// selectedIndex={month}
// wrapperHeight={180}
// wrapperBackground="#fff"
// itemHeight={40}
// highlightColor="#E5E7EB"
// highlightBorderWidth={1}
// renderItem={(data)=>(
// <Text className="text-lg">
// {data}
// </Text>
// )}
// onValueChange={(data,index)=>{
// setMonth(index)
// }}
// />

// {/* Day */}

// <ScrollPicker
// dataSource={days}
// selectedIndex={day}
// wrapperHeight={180}
// wrapperBackground="#fff"
// itemHeight={40}
// highlightColor="#E5E7EB"
// highlightBorderWidth={1}
// renderItem={(data)=>(
// <Text className="text-lg">
// {data}
// </Text>
// )}
// onValueChange={(data,index)=>{
// setDay(index)
// }}
// />

// {/* Year */}

// <ScrollPicker
// dataSource={years}
// selectedIndex={year}
// wrapperHeight={180}
// wrapperBackground="#fff"
// itemHeight={40}
// highlightColor="#E5E7EB"
// highlightBorderWidth={1}
// renderItem={(data)=>(
// <Text className="text-lg">
// {data}
// </Text>
// )}
// onValueChange={(data,index)=>{
// setYear(index)
// }}
// />

// </View>

// </View>

// </View>

// </Modal>

// )

// }

// export default CustomDatePicker


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
<Text className="text-gray-500">
Cancel
</Text>
</TouchableOpacity>

<Text className="font-semibold">
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