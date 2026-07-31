import React, { useState, useEffect, useMemo } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import { cardStyle, buttonShadow } from "../../../utils/cardStyle";
import { getAuth } from "../../../utils/authStorage";
import { useApplyLeaveMutation } from "../../../redux/features/attendance/attendanceApi";

import dayjs from "dayjs";
import useHandleMutation from "../../../hooks/useHandleMutation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LeaveFormCard = ({ onSuccess }) => {


    // ================= STATE =================

    const [empId, setEmpId] = useState("")
    const [empName, setEmpName] = useState("")
    const [reason, setReason] = useState("")
    const [leaveType, setLeaveType] = useState("paid")

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [openStart, setOpenStart] = useState(false)
    const [openEnd, setOpenEnd] = useState(false)

    const [error, setError] = useState("")
    const [dateError, setDateError] = useState("")
    const [reasonError, setReasonError] = useState("")

    const [applyLeave, { isLoading }] = useApplyLeaveMutation()
    const { handleMutation } = useHandleMutation();


    // ================= LOAD USER =================

    useEffect(() => {

        const loadUser = async () => {

            const auth = await getAuth()

            setEmpId(auth?.user?.empId)
            setEmpName(auth?.user?.name)

        }

        loadUser()

    }, [])


    // ================= RESET =================

    const resetForm = () => {
        
        setReason("")
        // setLeaveType("paid")
        setStartDate(new Date())
        setEndDate(new Date())
        setDateError("")
        setReasonError("")

    }


    // ================= VALIDATION =================

    const validate = () => {

        let valid = true

        if (dateError) {
            valid = false
        }

        if (!reason?.trim()) {

            setReasonError("Reason is required")
            valid = false

        } else {
            setReasonError("")
        }

        return valid

    }


    // ================= SUBMIT =================

    const handleSubmit = async () => {

        if (!validate()) return

        const res = await handleMutation({

            apiFunc: applyLeave,

            params: {
                empId,
                empName,
                startDate,
                endDate,
                reason,
                
            },

            showSuccess: false

        })
        console.log(res, 'res')

        if (res) {

            resetForm()
            onSuccess?.(res?.message)

        }

    }




    // ================= LEAVE DAYS =================

    const leaveDays = useMemo(() => {

        const start = dayjs(startDate).startOf("day")
        const end = dayjs(endDate).startOf("day")

        // invalid date
        if (end.isBefore(start)) {
            return 0
        }

        return end.diff(start, "day") + 1

    }, [startDate, endDate])

    useEffect(() => {

        if (dayjs(endDate).isBefore(dayjs(startDate))) {
            setDateError("End date cannot be before start date")
        } else {
            setDateError("")
        }

    }, [startDate, endDate])
    const today = new Date()

    const maxDate = dayjs()
        .add(12, "month")
        .toDate()


        

    return (
        <>


            <View
                style={cardStyle}
                className="bg-white rounded-3xl p-5 mt-5 border border-gray-200"
            >

                {/* ================= LEAVE TYPE ================= */}

 



                {/* ================= TITLE ================= */}

                <Text className="text-[22px] font-semibold text-secondary">
                    Leave Application Form
                </Text>



                {/* ================= START DATE ================= */}

                <View className="mt-4">

                    <Text className="text-[#474747] text-sm border-1 font-normal " style={{includeFontPadding:false}}>
                        Start Date
                    </Text>

                    <TouchableOpacity
                        onPress={() => setOpenStart(true)}
                        className="bg-gray-100 rounded-xl px-4 py-4 mt-2 flex-row justify-between border border-gray-200"
                    >

                        <Text className="font-normal text-secondary" style={{includeFontPadding:false}}>
                            {dayjs(startDate).format("DD MMM YYYY")}
                        </Text>

                        <Ionicons
                            name="calendar-outline"
                            size={18}
                        />

                    </TouchableOpacity>

                </View>



                {/* ================= END DATE ================= */}

                <View className="mt-4">

                    <Text className="text-[#474747] text-sm font-normal" style={{includeFontPadding:false}}>
                        End Date
                    </Text>

                    <TouchableOpacity
                        onPress={() => setOpenEnd(true)}
                        className="bg-gray-100 rounded-xl px-4 py-4 mt-2 flex-row justify-between border border-gray-200"
                    >

                        <Text className="font-normal text-secondary" style={{includeFontPadding:false}}>
                            {dayjs(endDate).format("DD MMM YYYY")}
                        </Text>

                        <Ionicons
                            name="calendar-outline"
                            size={18}
                        />

                    </TouchableOpacity>

                </View>



                {/* ================= ERROR ================= */}

                {dateError ? (
                    <Text className="text-red-500 text-xs mt-2 font-normal" style={{includeFontPadding:false}} >
                        {dateError}
                    </Text>
                ) : null}



                {/* ================= REASON ================= */}

                <View className="mt-4 ">

                    <Text className="text-[#474747] text-sm font-normal" style={{includeFontPadding:false}}>
                        Reason for Leave
                        <Text className="text-red-500 font-normal" style={{includeFontPadding:false}}>*</Text>
                    </Text>
                    <TextInput
                        multiline
                        textAlignVertical="top"
                        value={reason}
                        onChangeText={setReason}
                        className="bg-gray-100 rounded-xl px-4 py-3 mt-2 h-28 border border-gray-200 font-normal"
                        style={{includeFontPadding:false}}
                    />
                    {reasonError ? (
                        <Text className="text-red-500 text-xs mt-1 font-normal" style={{includeFontPadding:false}}>
                            {reasonError}
                        </Text>
                    ) : null}
                </View>



                {/* ================= NOTE ================= */}

                {leaveDays > 0 && (

                    <View
                        className="mt-4 px-4 py-3 rounded-xl"
                        style={{
                            backgroundColor: "#EEF5FF",
                            borderWidth: 1,
                            borderColor: "#C7D7FE"
                        }}
                    >

                        <Text>

                            <Text className="font-semibold text-secondary" style={{includeFontPadding:false}}>
                                Note :
                            </Text>

                            {" "}Applying leave for {leaveDays} {leaveDays === 1 ? "day" : "days"}

                        </Text>

                    </View>

                )}



                {/* ================= SUBMIT ================= */}

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isLoading}
                    style={buttonShadow}
                    className="bg-accent rounded-2xl py-4 mt-5 items-center"
                >

                    {isLoading ? (

                        <ActivityIndicator color="#fff" />

                    ) : (

                        <Text className="text-white font-semibold">
                            Submit Leave Request
                        </Text>

                    )}

                </TouchableOpacity>



                {/* ================= DATE PICKER ================= */}

                <DatePicker
                    modal
                    open={openStart}
                    date={startDate}
                    minimumDate={today}
                    maximumDate={maxDate}
                    mode="date"
                    onConfirm={(date) => {

                        setOpenStart(false)
                        setStartDate(date)

                    }}
                    onCancel={() => setOpenStart(false)}
                />


                <DatePicker
                    modal
                    open={openEnd}
                    date={endDate}
                    minimumDate={startDate}
                    maximumDate={maxDate}
                    mode="date"
                    onConfirm={(date) => {

                        setOpenEnd(false)
                        setEndDate(date)

                    }}
                    onCancel={() => setOpenEnd(false)}
                />


            </View>

            {/* </KeyboardAwareScrollView> */}
        </>
    )

}

export default LeaveFormCard








