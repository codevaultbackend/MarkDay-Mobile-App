import React from "react";
import { View, Text } from "react-native";

const LeaveHistoryList = () => {

return (

<View className="mt-4">

<Text className="text-lg font-semibold">
All Leave Requests
</Text>


{[1,2,3].map((item,index)=>{

const status = index === 0 ? "Pending" : "Approved";

return(

<View
key={index}
style={{
shadowColor:"#000",
shadowOffset:{width:0,height:2},
shadowOpacity:0.08,
shadowRadius:6,
elevation:3
}}
className="bg-white rounded-3xl p-4 mt-4"
>

{/* Header */}

<View className="flex-row justify-between items-center">

<Text className="font-semibold">
Leave Request ID #46789
</Text>

<View
className={`
px-3 py-1 rounded-full
${status === "Pending" && "bg-orange-100"}
${status === "Approved" && "bg-green-100"}
`}
>

<Text
className={`
text-xs
${status === "Pending" && "text-orange-600"}
${status === "Approved" && "text-green-600"}
`}
>
{status}
</Text>

</View>

</View>

<Text className="text-gray-400 text-xs mt-1">
Applied on Feb 13, 2026
</Text>


{/* Dates */}

<View className="flex-row justify-between mt-4">

<View>
<Text className="text-xs text-gray-400">
From Date
</Text>

<Text className="font-medium">
29/01/26
</Text>
</View>

<View>
<Text className="text-xs text-gray-400">
To Date
</Text>

<Text className="font-medium">
29/01/26
</Text>
</View>

<View>
<Text className="text-xs text-gray-400">
Total Days
</Text>

<Text className="font-medium">
5 Days
</Text>
</View>

</View>

</View>

)

})}

</View>

)

}

export default LeaveHistoryList