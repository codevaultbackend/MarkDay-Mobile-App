import React, { useState, useRef, useEffect } from "react";
import { KeyboardAvoidingView, ScrollView, StatusBar, View } from "react-native";
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
import { useGetLeavesQuery } from "../../redux/features/attendance/attendanceApi";
import { getAuth } from "../../utils/authStorage";

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

    //  get User Leave   ===== start
    const [authUser, setAuthUser] = useState(null);
    const empId = authUser?.empId;
    useEffect(() => {

        const loadAuth = async () => {
            const auth = await getAuth();
            setAuthUser(auth?.user);
        };

        loadAuth();

    }, []);

    const {
        data: leaves,
        isLoading: leaveLoading,
        error: leaveError,
        isFetching: isleaveFetching,
        refetch: refetchLeaves
    } = useGetLeavesQuery(empId, {
        skip: !empId
    });

    //  get User Leave   ===== end






    return (

        <SafeAreaView
            className="flex-1 bg-primary px-5"
            edges={['top', 'left', 'right']}
        >
              <StatusBar
                  barStyle="dark-content"
                  backgroundColor="#FCF7ED"
                />
            <LeaveHeader navigation={navigation} />
            <LeaveStatsCard
                leaves={leaves}
                loading={leaveLoading || isleaveFetching}
                leaveError={leaveError}
            />
            <LeaveTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >

                <ScrollView
                    ref={scrollRef}   // ✅ add ref
                    showsVerticalScrollIndicator={false}
                    eyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 40 }}
                >

                    {/* Header */}


                    {/* Stats */}


                    {/* Tabs */}

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

                            <LeaveHistoryList
                                leaves={leaves}
                                loading={leaveLoading || isleaveFetching}
                                error={leaveError}
                                refetch={refetchLeaves}
                            />

                        )}

                    </View>
                    {
                        activeTab === "request" && <>
                            {/* Policy */}
                            <LeavePolicyCard />
                        </>
                    }


                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )

}

export default LeaveScreen