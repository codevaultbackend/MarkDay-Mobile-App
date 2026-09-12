import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from "react-native";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

import { useGetAttendanceQuery } from "../../redux/features/attendance/attendanceApi.js";

import AttendanceSkeleton from "./components/CalendarSkeleton.jsx";
import RetryScreen from "./components/RetryScreen.jsx";
import { SafeAreaView } from "react-native-safe-area-context";

import Calendar from "./components/Calendar.jsx";

import { getAuth } from "../../utils/authStorage";

import {
  useGetLeavesQuery,
  useGetHolidaysQuery,
} from "../../redux/features/attendance/attendanceApi.js";

import AttendanceCard from "./components/AttendanceCard.jsx";

import Ionicons from "react-native-vector-icons/Ionicons";


const CalendarScreen = ({ navigation }) => {

  const [refreshing, setRefreshing] = useState(false);

  /* ===============================
     Current Selected Date
  ================================ */

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("M/D/YYYY")
  );


  /* ===============================
     Auth User
  ================================ */

  const [authUser, setAuthUser] = useState(null);

  const empId = authUser?.empId;


  useEffect(() => {

    const loadAuth = async () => {

      const auth = await getAuth();

      setAuthUser(auth?.user);

    };

    loadAuth();

  }, []);


  /* ===============================
     Attendance API
  ================================ */

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch: refetchAttendance,
  } = useGetAttendanceQuery(empId, {
    skip: !empId,
  });


  /* ===============================
     Leaves API
  ================================ */

  const {
    data: leaves,
    isLoading: leaveLoading,
    isFetching: isleaveFetching,
    error: leaveError,
    refetch: refetchLeaves,
  } = useGetLeavesQuery(empId, {
    skip: !empId,
  });


  /* ===============================
     Holidays API
  ================================ */

  const {
    data: holidays,
    isLoading: holidayLoading,
    error: holidayError,
    refetch: refetchHoliday,
  } = useGetHolidaysQuery();


  /* ===============================
     Normalize Attendance Dates
  ================================ */

  const normalizedAttendance = useMemo(() => {

    if (!Array.isArray(data)) {
      return [];
    }

    return data
      .map((item) => {

        if (!item?.date) {
          return null;
        }

        const parsedDate = dayjs(
          item.date,
          "M/D/YYYY",
          true
        );

        if (!parsedDate.isValid()) {
          return null;
        }

        return {
          ...item,
          date: parsedDate.format("M/D/YYYY"),
        };

      })
      .filter(Boolean);

  }, [data]);


  /* ===============================
     Calendar Data Version

     Forces Calendar to refresh when
     attendance API data changes.
  ================================ */

  const calendarKey = useMemo(() => {

    return normalizedAttendance
      .map((item) =>
        `${item.date}-${item.inTime || ""}-${item.outTime || ""}`
      )
      .join("|");

  }, [normalizedAttendance]);


  /* ===============================
     Retry
  ================================ */

  const handleRetry = () => {

    if (empId) {
      refetchAttendance();
      refetchLeaves();
    }

    refetchHoliday();

  };


  /* ===============================
     Selected Attendance
  ================================ */

  const attendance = useMemo(() => {

    if (!normalizedAttendance.length) {
      return null;
    }

    return normalizedAttendance.find(
      (item) => item.date === selectedDate
    ) || null;

  }, [
    normalizedAttendance,
    selectedDate,
  ]);


  /* ===============================
     Selected Date Type
  ================================ */

  const selectedType = useMemo(() => {

    if (!selectedDate) {
      return null;
    }


    /* ===============================
       Present
    ================================ */

    const isPresent = normalizedAttendance.some(
      (item) =>
        item.date === selectedDate &&
        !!item.inTime
    );


    /* ===============================
       Leave
    ================================ */

    const isLeave = leaves?.leaves?.some((l) => {

      if (l.status !== "approved") {
        return false;
      }

      const start = dayjs(l.startDate).startOf("day");

      const end = dayjs(l.endDate).startOf("day");

      const selected = dayjs(
        selectedDate,
        "M/D/YYYY",
        true
      ).startOf("day");

      if (
        !start.isValid() ||
        !end.isValid() ||
        !selected.isValid()
      ) {
        return false;
      }

      return (
        (
          selected.isAfter(start) ||
          selected.isSame(start, "day")
        ) &&
        (
          selected.isBefore(end) ||
          selected.isSame(end, "day")
        )
      );

    });


    /* ===============================
       Holiday
    ================================ */

    const isHoliday = holidays?.some(
      (h) =>
        dayjs(h.date).format("M/D/YYYY") ===
        selectedDate
    );


    /* ===============================
       Final Type
    ================================ */

    if (isPresent) {
      return "present";
    }

    if (isLeave) {
      return "leave";
    }

    if (isHoliday) {
      return "holiday";
    }

    return "absent";

  }, [
    selectedDate,
    normalizedAttendance,
    leaves,
    holidays,
  ]);


  /* ===============================
     Refresh
  ================================ */

  const onRefresh = async () => {

    if (!empId) {
      return;
    }

    setRefreshing(true);

    try {

      await Promise.all([
        refetchAttendance(),
        refetchLeaves(),
        refetchHoliday(),
      ]);

    } finally {

      setRefreshing(false);

    }

  };


  /* ===============================
     Error
  ================================ */

  if (error || leaveError || holidayError) {

    return (
      <RetryScreen
        onRetry={handleRetry}
        error={
          error ||
          leaveError ||
          holidayError
        }
      />
    );

  }


  /* ===============================
     Loading
  ================================ */

  const pageLoading =
    isLoading ||
    leaveLoading ||
    holidayLoading ||
    isFetching ||
    isleaveFetching;


  /* ===============================
     UI
  ================================ */

  return (

    <SafeAreaView
      className="flex-1 bg-primary"
      edges={["top", "right", "left"]}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FCF7ED"
      />


      {/* Header */}

      <View className="flex-row items-center justify-between mt-4 mb-2 px-5">

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


      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-5"
        contentContainerStyle={{
          paddingBottom: 40,
        }}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#F59E0B"]}
            tintColor="#F59E0B"
          />
        }
      >


        {/* ===============================
            Calendar
        ================================ */}

        <Calendar
          key={calendarKey}

          selectedDate={selectedDate}

          setSelectedDate={setSelectedDate}

          data={normalizedAttendance}

          empId={empId}

          hireDate={authUser?.hireDate}

          leaves={leaves}

          holidays={holidays}

          loading={pageLoading}
        />


        {/* ===============================
            Attendance Card
        ================================ */}

        <AttendanceCard
          hireDate={authUser?.hireDate}

          attendance={attendance}

          leaves={leaves}

          selectedDate={selectedDate}

          type={selectedType}

          holidays={holidays}

          loading={pageLoading}
        />


      </ScrollView>

    </SafeAreaView>

  );
};


export default CalendarScreen;