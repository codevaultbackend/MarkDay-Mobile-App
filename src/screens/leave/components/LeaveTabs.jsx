import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform
} from "react-native";

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

    // responsive width
    const tabWidth = (width - 40) / 2

    useEffect(() => {

        translateX.value = withSpring(
            activeTab === "request" ? 0 : tabWidth,
            {
                damping: 15,
                stiffness: 120
            }
        )

    }, [activeTab])


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    })


    return (

        <View
            style={[

                cardStyle,
                {
                    borderWidth: 1,
                    borderColor: "#E5E7EB"
                }
            ]}
            className="bg-white rounded-full mt-5 p-1 flex-row overflow-hidden h-[52px] flex-row items-center mb-1 "
        >

            {/* Animated Background */}

            <Animated.View
                style={[
                    animatedStyle,
                    {
                        position: "absolute",
                        width: "50%",
                        height: "100%",
                    }
                ]}
                className="bg-accent rounded-full"
            />


            {/* Leave Request */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab("request")}
                className="flex-1 h-[44px] items-center flex-row  justify-center "
            >

                <Text
                    style={{ includeFontPadding: false }}
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



            {/* Leave History */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab("history")}
                className="flex-1 h-[44px] items-center flex-row   justify-center "
            >

                <Text
                    style={{ includeFontPadding: false }}
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