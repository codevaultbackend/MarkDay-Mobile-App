import React, { useEffect, useState } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";
import CheckGrid from "./CheckGrid";
import AttendanceCard from "./AttendanceCard";
import RecentActivity from "./RecentActivity";

import { useCurrentLocation } from "../../hooks/useCurrentLocation";

import ShiftEndingBanner from "./components/ShiftEndingBanner";
import CheckInBanner from "./components/CheckInBanner";

import { useDispatch, useSelector } from "react-redux";
import {
  useGetAttendanceQuery, useGetLeavesQuery,
  useGetHolidaysQuery
} from "../../redux/features/attendance/attendanceApi";
import { getAuth } from "../../utils/authStorage";
import { setTodayAttendance } from "../../redux/slices/attendanceSlice";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import RetryScreen from "../calendar/components/RetryScreen";
import RecentActivitySkeleton from "./components/RecentActivitySkeleton";



dayjs.extend(customParseFormat);

const HomeScreen = ({ navigation }) => {

  const { location, getCurrentLocation, loading, address } = useCurrentLocation();

  /* ------------------------------- */
  /* Location Fetch */
  /* ------------------------------- */

  useEffect(() => {

    const init = async () => {

      const loc = await getCurrentLocation();


      if (loc) {
        console.log("location ready");
      }

    };

    init();

  }, []);


  /* ------------------------------- */
  /* Redux State */
  /* ------------------------------- */

  const {
    checkInTime,
    checkOutTime,
    inLocation,
    outLocation
  } = useSelector(
    state => state.todayAttendance
  );

  const dispatch = useDispatch();


  /* ------------------------------- */
  /* Auth User */
  /* ------------------------------- */

  const [authUser, setAuthUser] = useState(null);
  const empId = authUser?.empId;

  useEffect(() => {

    const loadAuth = async () => {
      const auth = await getAuth();
      setAuthUser(auth?.user);
    };

    loadAuth();

  }, []);


  /* ------------------------------- */
  /* Attendance API */
  /* ------------------------------- */

  const {
    data: attendance,
    isLoading: attendanceLoading,
    isFetching: attendanceFetching,
    error: attendanceError,
    refetch: refetchAttendance
  } = useGetAttendanceQuery(empId, {
    skip: !empId
  })

  const {
    data: leaves,
    isLoading: leavesLoading,
    isFetching: leavesFetching,
    error: leavesError,
    refetch: refetchLeaves
  } = useGetLeavesQuery(empId, {
    skip: !empId
  })

  const {
    data: holidays,
    isLoading: holidaysLoading,
    error: holidaysError,
    refetch: refetchHolidays
  } = useGetHolidaysQuery()

  const Apiloading =
    attendanceLoading ||
    leavesLoading ||
    holidaysLoading ||
    attendanceFetching ||
    leavesFetching


  const Apierror =
    attendanceError ||
    leavesError ||
    holidaysError
  /* ------------------------------- */
  /* Format Time Function */
  /* ------------------------------- */

  const formatTime = (time) => {

    if (!time) return null;

    return dayjs(
      time,
      ["h:mm:ss A", "hh:mm:ss A", "h:mm A"]
    ).format("hh:mm A");

  };


  /* ------------------------------- */
  /* Sync API -> Redux */
  /* ------------------------------- */

  useEffect(() => {

    if (!attendance?.length) return;


    const todayDate = dayjs().format("M/D/YYYY");
    console.log(todayDate, "todayDate")
    const today = attendance.find(
      item => item.date === todayDate
    );

    if (!today) return;


    const formattedInTime = formatTime(today?.inTime);
    const formattedOutTime = formatTime(today?.outTime);


    /* Only Update When Changed */

    if (

      formattedInTime !== checkInTime ||
      formattedOutTime !== checkOutTime ||
      today?.inLocation !== inLocation ||
      today?.outLocation !== outLocation

    ) {

      dispatch(setTodayAttendance({

        date: today?.date,

        inTime: formattedInTime,
        outTime: formattedOutTime,

        inLocation: today?.inLocation,
        outLocation: today?.outLocation,

        isOffline: false

      }));

    }

  }, [attendance]);


  /* ------------------------------- */
  /* UI */
  /* ------------------------------- */
  const handleRetry = () => {
    refetchAttendance()
    refetchLeaves()
    refetchHolidays()
  }
  return (

    <SafeAreaView
      className="flex-1 bg-primary"
      edges={['top', 'left', 'right']}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FCF7ED"
      />

      <View className="flex-1">

        <ScrollView showsVerticalScrollIndicator={false}>

          <Header loading={loading} address={address} />

          {/* Check In Banner */}

          {!checkInTime && (
            <CheckInBanner navigation={navigation} />
          )}

          {/* Shift Ending Banner */}


          {
            checkInTime && !checkOutTime && <ShiftEndingBanner navigation={navigation} />
          }



          {/* Cards */}
          {
            checkInTime && <CheckGrid />
          }



          {
            Apierror || Apiloading ? (

              Apierror ? (

                <View
                  style={{ flex: 1, minHeight: 450 }}
                  className="w-full justify-center items-center"
                >
                  <RetryScreen
                    onRetry={handleRetry}
                    error={Apierror}
                  />
                </View>

              ) : (

                <View className="px-5">
                  <RecentActivitySkeleton />
                </View>

              )

            ) : (

              <View>

                <AttendanceCard
                  attendance={attendance}
                  leaves={leaves}
                  holidays={holidays}
                  loading={Apiloading}
                />



                <RecentActivity
                  attendance={attendance}
                  leaves={leaves}
                  loading={Apiloading}
                />

              </View>

            )
          }



        </ScrollView>

      </View>

    </SafeAreaView>

  );

};

export default HomeScreen;