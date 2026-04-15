import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { cardStyle } from "../../utils/cardStyle";
import { useGetAttendanceQuery } from "../../redux/features/attendance/attendanceApi";
import { useGetLeavesQuery } from "../../redux/features/attendance/attendanceApi";
import { useGetHolidaysQuery } from "../../redux/features/attendance/attendanceApi";
import { getAuth } from "../../utils/authStorage";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const AttendanceCard = ({
  attendance,
  leaves,
  holidays,
  loading
}) => {

  const [empId, setEmpId] = useState(null);

  useEffect(() => {
    const load = async () => {
      const auth = await getAuth();
      setEmpId(auth?.user?.empId);
    };
    load();
  }, []);

 
  

 


  // Present Count
  const presentCount = useMemo(() => {
    return attendance?.filter(item => item?.inTime)?.length || 0;
  }, [attendance]);


  // Late Count
  const lateCount = useMemo(() => {

    if (!attendance) return 0;

    return attendance.filter(item => {

      if (!item?.inTime) return false;

      const checkIn = dayjs(item.inTime, "h:mm:ss A");
      const lateTime = dayjs("10:15 AM", "h:mm A");

      return checkIn.isAfter(lateTime);

    }).length;

  }, [attendance]);


  // Leave Dates
  const leaveDates = useMemo(() => {

    if (!leaves?.leaves) return [];

    let arr = [];

    leaves.leaves
      .filter(l => l.status?.toLowerCase() === "approved")
      .forEach(leave => {

        let start = dayjs(leave.startDate);
        let end = dayjs(leave.endDate);

        while (start.isBefore(end) || start.isSame(end)) {

          arr.push(start.format("M/D/YYYY"));
          start = start.add(1, "day");

        }

      });

    return arr;

  }, [leaves]);


  // Holiday Dates
  const holidayDates = useMemo(() => {

    if (!holidays) return [];

    return holidays.map(item =>
      dayjs(item.date).format("M/D/YYYY")
    );

  }, [holidays]);


  // Absent Count
  const absentCount = useMemo(() => {

    const today = dayjs();
    const start = today.startOf("month");

    let absent = 0;

    for (
      let day = start;
      day.isBefore(today);
      day = day.add(1, "day")
    ) {

      const date = day.format("M/D/YYYY");

      const isPresent = attendance?.find(
        item => item.date === date && item.inTime
      );

      const isLeave = leaveDates.includes(date);
      const isHoliday = holidayDates.includes(date);

      if (!isPresent && !isLeave && !isHoliday) {
        absent++;
      }

    }

    return absent;

  }, [attendance, leaveDates, holidayDates]);


  return (

    <View
      className="mx-5 bg-white p-4 rounded-3xl mt-4 border border-gray-200"
      style={cardStyle}
    >

      {/* Header */}

      <View className="flex-row justify-between items-center">

        <Text
          className="text-lg font-semibold text-secondary"
          style={{ includeFontPadding: false }}
        >
          Attendance
        </Text>

        <View className="bg-[#FCF7ED] px-3 py-1 rounded-full">

          <Text
            className="text-xs text-gray-500"
            style={{ includeFontPadding: false }}
          >
            This Month
          </Text>

        </View>

      </View>


      {/* Progress Bar */}

      <View className="h-2 bg-gray-200 rounded-full mt-4 flex-row overflow-hidden">

        <View
          className="bg-green-500"
          style={{ width: `${presentCount * 5}%` }}
        />

        <View
          className="bg-red-400"
          style={{ width: `${absentCount * 5}%` }}
        />

        <View
          className="bg-yellow-400"
          style={{ width: `${lateCount * 5}%` }}
        />

        <View className="flex-1 bg-gray-200" />

      </View>


      <View className="flex-row justify-between mt-4">

        {/* Present */}

        <View
          className="bg-gray-50 p-3 rounded-2xl w-[31%] border border-gray-200"
          style={cardStyle}
        >

          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />

            <Text
              className="text-xs text-gray-400"
              style={{ includeFontPadding: false }}
            >
              Present
            </Text>

          </View>

          <Text
            className="text-lg font-semibold mt-1 text-secondary"
            style={{ includeFontPadding: false }}
          >
            {presentCount}
          </Text>

        </View>


        {/* Absent */}

        <View
          className="bg-gray-50 p-3 rounded-2xl w-[31%] border border-gray-200"
          style={cardStyle}
        >

          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-red-400 rounded-full mr-2" />

            <Text
              className="text-xs text-gray-400"
              style={{ includeFontPadding: false }}
            >
              Absent
            </Text>

          </View>

          <Text
            className="text-lg font-semibold mt-1 text-secondary"
            style={{ includeFontPadding: false }}
          >
            {absentCount}
          </Text>

        </View>


        {/* Late */}

        <View
          className="bg-gray-50 p-3 rounded-2xl w-[31%] border border-gray-200"
          style={cardStyle}
        >

          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />

            <Text
              className="text-xs text-gray-400"
              style={{ includeFontPadding: false }}
            >
              Late
            </Text>

          </View>

          <Text
            className="text-lg font-semibold mt-1 text-secondary"
            style={{ includeFontPadding: false }}
          >
            {lateCount}
          </Text>

        </View>

      </View>

    </View>

  );

};

export default AttendanceCard;