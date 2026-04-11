import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { cardStyle } from "../../../utils/cardStyle";

import Animated, {
useSharedValue,
useAnimatedStyle,
withSpring
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const LeaveTabs = ({
activeTab,
setActiveTab
}) => {

const translateX = useSharedValue(0)

useEffect(() => {

translateX.value = withSpring(
activeTab === "request" ? 0 : (width - 40) / 2
)

},[activeTab])

const animatedStyle = useAnimatedStyle(() => {

return {
transform: [
{ translateX: translateX.value }
]
}

})


return (

<View
style={cardStyle}
className="bg-white rounded-full mt-5 p-1 flex-row overflow-hidden"
>

{/* Animated Background */}

<Animated.View
style={[
animatedStyle,
{
position:"absolute",
width:"50%",
height:"100%"
}
]}
className="bg-accent rounded-full"
/>


{/* Request Tab */}

<TouchableOpacity
onPress={() => setActiveTab("request")}
className="flex-1 py-3 items-center"
>

<Text
className={`
text-sm font-medium
${activeTab === "request"
? "text-white"
: "text-gray-400"
}
`}
>
Leave Request
</Text>

</TouchableOpacity>



{/* History Tab */}

<TouchableOpacity
onPress={() => setActiveTab("history")}
className="flex-1 py-3 items-center"
>

<Text
className={`
text-sm font-medium
${activeTab === "history"
? "text-white"
: "text-gray-400"
}
`}
>
Leave History
</Text>

</TouchableOpacity>


</View>

)

}

export default LeaveTabs