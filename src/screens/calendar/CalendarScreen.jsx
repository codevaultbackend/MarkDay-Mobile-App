import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,

  ScrollView,
  TouchableOpacity
} from "react-native";

import dayjs from "dayjs";
import { useGetAttendanceQuery } from "../../redux/features/attendance/attendanceApi.js";

import AttendanceSkeleton from "./components/CalendarSkeleton.jsx";
import RetryScreen from "./components/RetryScreen.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import Calendar from './components/Calendar.jsx'
import { getAuth } from "../../utils/authStorage";
import {
  useGetLeavesQuery,
  useGetHolidaysQuery
} from "../../redux/features/attendance/attendanceApi.js";
import AttendanceCard from "./components/AttendanceCard.jsx";
import Ionicons from "react-native-vector-icons/Ionicons";
const CalendarScreen = ({ navigation }) => {

  // Current Date
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("M/D/YYYY")
  );
  const [authUser, setAuthUser] = useState(null);
  const empId = authUser?.empId;
  useEffect(() => {

    const loadAuth = async () => {
      const auth = await getAuth();
      setAuthUser(auth?.user);
    };

    loadAuth();

  }, []);

  // API Call
  const {
    data,
    isLoading,
     isFetching ,
    error,
    refetch
  } = useGetAttendanceQuery(empId, {
    skip: !empId
  });

 console.log(data ,"data")
  const {
    data: leaves,
    isLoading: leaveLoading,
    isFetching:isleaveFetching,
  } = useGetLeavesQuery(empId, {
    skip: !empId
  });
   console.log(leaves ,"leaves")

  const {
    data: holidays,
    isLoading: holidayLoading
  } = useGetHolidaysQuery();

  // Filter By Date
  const attendance = useMemo(() => {

    if (!data) return null;

    return data.find(
      item => item.date === selectedDate
    );

  }, [data, selectedDate]);


   


  const selectedType = useMemo(() => {

    if (!selectedDate) return null;

    const isPresent = data?.some(
      item => item.date === selectedDate && item.inTime
    );

    const isLeave = leaves?.leaves?.some(l => {

      const start = dayjs(l.startDate);
      const end = dayjs(l.endDate);
      const selected = dayjs(selectedDate);

      return (
        l.status === "approved" &&
        selected.isAfter(start.subtract(1, "day")) &&
        selected.isBefore(end.add(1, "day"))
      );

    });

    const isHoliday = holidays?.some(
      h => dayjs(h.date).format("M/D/YYYY") === selectedDate
    );

    if (isPresent) return "present";
    if (isLeave) return "leave";
    if (isHoliday) return "holiday";

    return "absent";

  }, [selectedDate, data, leaves, holidays])

  // Error
  if (error) {
    return <RetryScreen onRetry={refetch} error={error}  />;
  }

  return (

    <SafeAreaView className="flex-1 bg-primary" edges={['top', 'right', 'left']}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-5 "
        contentContainerStyle={{ paddingBottom: 40 }}
        
      >

        {/* Header */}
        <View className="flex-row items-center justify-between mt-4 mb-2">

          {/* Back Button */}

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


          {/* Title */}

          <Text
            className="text-lg font-semibold text-center flex-1"
            style={{ includeFontPadding: false }}
          >
            Attendance History
          </Text>


          <View className="w-8" />

        </View>


        {/* Calendar Card */}


        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          data={data}
          empId={empId} 
          leaves={leaves}
          holidays={holidays}
          loading={
            isLoading || leaveLoading || holidayLoading ||isFetching || isleaveFetching
          }

        />
        {/* Attendance Card */}
        <AttendanceCard
          attendance={attendance}
          leaves={leaves}
          selectedDate={selectedDate}
          type={selectedType}
          holidays={holidays}
           loading={
            isLoading || leaveLoading || holidayLoading ||isFetching || isleaveFetching
          }
        />



      </ScrollView>

    </SafeAreaView>

  );
};

export default CalendarScreen;