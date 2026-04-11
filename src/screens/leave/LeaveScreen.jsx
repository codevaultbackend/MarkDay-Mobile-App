import React, { useState, useRef, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
    FadeIn,
    FadeOut,
    FadeInDown,
    LinearTransition
} from "react-native-reanimated";
import LeaveHeader from "./components/LeaveHeader";
import LeaveStatsCard from "./components/LeaveStatsCard";
import LeaveTabs from "./components/LeaveTabs";
import LeaveSuccessCard from "./components/LeaveSuccessCard";
import LeaveFormCard from "./components/LeaveFormCard";
import LeavePolicyCard from "./components/LeavePolicyCard";
import LeaveHistoryList from "./components/LeaveHistoryList";

const LeaveScreen = ({ navigation }) => {

    const [activeTab, setActiveTab] = useState("request")
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")

    // ✅ Scroll Ref
    const scrollRef = useRef(null)
    useEffect(() => {

        if (showSuccess) {

            const timer = setTimeout(() => {
                setShowSuccess(false)
            }, 3000) // 3 seconds

            return () => clearTimeout(timer)

        }

    }, [showSuccess])
    return (

        <SafeAreaView
            className="flex-1 bg-primary"
            edges={['top', 'left', 'right']}
        >

            <ScrollView
                ref={scrollRef}   // ✅ add ref
                showsVerticalScrollIndicator={false}
                className="px-5"
                contentContainerStyle={{ paddingBottom: 40 }}
            >

                {/* Header */}
                <LeaveHeader navigation={navigation} />

                {/* Stats */}
                <LeaveStatsCard />

                {/* Tabs */}
                <LeaveTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {/* Success */}
                {showSuccess && (

                    <Animated.View
                        entering={FadeInDown.duration(400)}
                        exiting={FadeOut.duration(300)}
                        layout={LinearTransition}
                    >

                        <LeaveSuccessCard
                            message={successMsg}
                            onClose={() => setShowSuccess(false)}
                        />

                    </Animated.View>

                )}

                {/* Form */}
                <View>

                    {/* Request */}
                    {activeTab === "request" && (

                        <LeaveFormCard
                            onSuccess={(message) => {

                                setSuccessMsg(message)
                                setShowSuccess(true)
                                setActiveTab("history")

                                // ✅ Scroll To Top
                                setTimeout(() => {
                                    scrollRef.current?.scrollTo({
                                        y: 0,
                                        animated: true
                                    })
                                }, 100)

                            }}
                        />

                    )}

                    {/* History */}
                    {activeTab === "history" && (

                        <LeaveHistoryList />

                    )}

                </View>

                {/* Policy */}
                <LeavePolicyCard />

            </ScrollView>

        </SafeAreaView>

    )

}

export default LeaveScreen