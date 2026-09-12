import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { cardStyle } from "../../utils/cardStyle";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useUser from "../../hooks/useUser";

dayjs.extend(customParseFormat);

const AttendanceCard = ({
  attendance,
  leaves,
  holidays,
  loading
}) => {

  const user = useUser();

  console.log(user, "----");


  /* -------------------------------- */
  /* Current Month                    */
  /* -------------------------------- */

  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  console.log(currentMonth, "currentMonth");
  console.log(currentYear, "currentYear");


  /* -------------------------------- */
  /* Present Count                    */
  /* -------------------------------- */

  const presentCount = useMemo(() => {

    if (!attendance) return 0;

    return attendance.filter(item => {

      console.log("🔥 PRESENT ITEM:", item);

      if (!item?.inTime) return false;

      const date = dayjs(item.date, [
        "M/D/YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ]);

      console.log("🔥 PRESENT DATE CHECK:", {
        originalDate: item?.date,
        inTime: item?.inTime,
        parsedDate: date.format("M/D/YYYY"),
        isValid: date.isValid(),
        month: date.month(),
        year: date.year()
      });

      return (
        date.isValid() &&
        date.month() === currentMonth &&
        date.year() === currentYear
      );

    }).length;

  }, [attendance, currentMonth, currentYear]);


  console.log(presentCount, "presentCount");


  /* -------------------------------- */
  /* Late Count                       */
  /* -------------------------------- */

  const lateCount = useMemo(() => {

    if (!attendance) return 0;

    return attendance.filter(item => {

      if (!item?.inTime) return false;

      const date = dayjs(item.date, [
        "M/D/YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ]);

      const isCurrentMonth =
        date.isValid() &&
        date.month() === currentMonth &&
        date.year() === currentYear;

      if (!isCurrentMonth) return false;


      const checkIn = dayjs(item.inTime, [
        "h:mm:ss A",
        "hh:mm:ss A",
        "h:mm A",
        "hh:mm A"
      ]);

      const lateTime = dayjs("10:15 AM", "h:mm A");


      console.log("🔥 LATE CHECK:", {
        date: item?.date,
        inTime: item?.inTime,
        checkInValid: checkIn.isValid(),
        checkIn: checkIn.format("hh:mm A"),
        lateTime: lateTime.format("hh:mm A"),
        isLate: checkIn.isAfter(lateTime)
      });


      return (
        checkIn.isValid() &&
        checkIn.isAfter(lateTime)
      );

    }).length;

  }, [attendance, currentMonth, currentYear]);


  console.log(lateCount, "lateCount");


  /* -------------------------------- */
  /* Leave Dates                      */
  /* -------------------------------- */

  const leaveDates = useMemo(() => {

    if (!leaves?.leaves) return [];

    let arr = [];

    leaves.leaves
      .filter(
        l => l.status?.toLowerCase() === "approved"
      )
      .forEach(leave => {

        let start = dayjs(leave.startDate);
        let end = dayjs(leave.endDate);

        while (
          start.isBefore(end) ||
          start.isSame(end)
        ) {

          arr.push(
            start.format("M/D/YYYY")
          );

          start = start.add(1, "day");

        }

      });

    return arr;

  }, [leaves]);


  console.log("🟡 APPROVED LEAVE DATES:", leaveDates);


  /* -------------------------------- */
  /* Holiday Dates                    */
  /* -------------------------------- */

  const holidayDates = useMemo(() => {

    if (!holidays) return [];

    return holidays.map(item =>
      dayjs(item.date).format("M/D/YYYY")
    );

  }, [holidays]);


  console.log("🔵 HOLIDAY DATES:", holidayDates);


  /* -------------------------------- */
  /* Absent Count                     */
  /* -------------------------------- */

  const absentCount = useMemo(() => {

    if (!user?.hireDate) return 0;

    const today = dayjs();

    const monthStart = today.startOf("month");

    const hireDate = dayjs(user.hireDate);

    const start = hireDate.isAfter(monthStart)
      ? hireDate.startOf("day")
      : monthStart;

    let absent = 0;


    for (
      let day = start;
      day.isBefore(today, "day");
      day = day.add(1, "day")
    ) {

      const date = day.format("M/D/YYYY");


      const isCurrentMonth =
        day.month() === currentMonth &&
        day.year() === currentYear;


      if (!isCurrentMonth) continue;


      const isPresent = attendance?.some(
        item => {

          if (!item?.inTime) return false;


          const itemDate = dayjs(item.date, [
            "M/D/YYYY",
            "MM/DD/YYYY",
            "YYYY-MM-DD",
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          ]);


          const result =
            itemDate.isValid() &&
            itemDate.format("M/D/YYYY") === date &&
            itemDate.month() === currentMonth &&
            itemDate.year() === currentYear;


          console.log("🔍 ABSENT DATE CHECK:", {
            checkingDate: date,
            attendanceDate: item?.date,
            parsedDate: itemDate.format("M/D/YYYY"),
            inTime: item?.inTime,
            isPresent: result
          });


          return result;

        }
      );


      const isLeave =
        leaveDates.includes(date);


      const isHoliday =
        holidayDates.includes(date);


      console.log("📅 ABSENT CHECK:", {
        date,
        isPresent,
        isLeave,
        isHoliday
      });


      if (
        !isPresent &&
        !isLeave &&
        !isHoliday
      ) {

        absent++;

      }

    }


    return absent;

  }, [
    attendance,
    leaveDates,
    holidayDates,
    user?.hireDate,
    currentMonth,
    currentYear,
  ]);


  console.log(absentCount, "absentCount");


  /* -------------------------------- */
  /* UI                               */
  /* -------------------------------- */

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
            className="text-xs text-gray-500 font-medium"
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
          style={{
            width: `${presentCount * 5}%`
          }}
        />


        <View
          className="bg-red-400"
          style={{
            width: `${absentCount * 5}%`
          }}
        />


        <View
          className="bg-yellow-400"
          style={{
            width: `${lateCount * 5}%`
          }}
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
              className="text-xs text-gray-400 font-normal"
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
              className="text-xs text-gray-400 font-normal"
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
              className="text-xs text-gray-400 font-medium"
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