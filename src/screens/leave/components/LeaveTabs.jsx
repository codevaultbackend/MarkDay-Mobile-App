import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import { cardStyle } from "../../../utils/cardStyle";

const LeaveTabs = ({ activeTab, setActiveTab }) => {

    const requestScale = useSharedValue(1);
    const historyScale = useSharedValue(1);

    const requestOpacity = useSharedValue(1);
    const historyOpacity = useSharedValue(0.6);

    useEffect(() => {
        if (activeTab === "request") {
            requestScale.value = withTiming(1, { duration: 150 });
            historyScale.value = withTiming(0.95, { duration: 150 });

            requestOpacity.value = withTiming(1, { duration: 150 });
            historyOpacity.value = withTiming(0.6, { duration: 150 });
        } else {
            requestScale.value = withTiming(0.95, { duration: 150 });
            historyScale.value = withTiming(1, { duration: 150 });

            requestOpacity.value = withTiming(0.6, { duration: 150 });
            historyOpacity.value = withTiming(1, { duration: 150 });
        }
    }, [activeTab]);

    const requestStyle = useAnimatedStyle(() => ({
        transform: [{ scale: requestScale.value }],
        opacity: requestOpacity.value,
    }));

    const historyStyle = useAnimatedStyle(() => ({
        transform: [{ scale: historyScale.value }],
        opacity: historyOpacity.value,
    }));

    return (
        <View
            style={[
                cardStyle,
                {
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                },
            ]}
            className="bg-white rounded-full mt-5 p-1 flex-row h-[52px] items-center mb-1"
        >

            {/* Request */}
            <Animated.View style={[{ flex: 1 }, requestStyle]}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setActiveTab("request")}
                    className={`
h-[44px] items-center justify-center rounded-full
${activeTab === "request" ? "bg-accent" : ""}
`}
                >
                    <Text
                    style={{includeFontPadding:false}}
                        className={`
text-sm font-medium
${activeTab === "request" ? "text-white" : "text-gray-400"}
`}
                    >
                        Leave Request
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            {/* History */}
            <Animated.View style={[{ flex: 1 }, historyStyle]}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setActiveTab("history")}
                    className={`
h-[44px] items-center justify-center rounded-full
${activeTab === "history" ? "bg-accent" : ""}
`}
                >
                    <Text
                    style={{includeFontPadding:false}}
                        className={`
text-sm font-medium
${activeTab === "history" ? "text-white" : "text-gray-400"}
`}
                    >
                        Leave History
                    </Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
    );
};

export default LeaveTabs;