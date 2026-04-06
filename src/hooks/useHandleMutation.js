import { useState, useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from "react-redux";
import { pushAlert } from "../redux/slices/alertSlice.js";
import { withTimeout } from "../utils/withTimeout.js";

/**
 * Custom Hook for Handling RTK Query Mutations
 *
 * Features:
 * ✅ Offline handling
 * ✅ Timeout handling
 * ✅ Loading state
 * ✅ Success/Error alerts
 * ✅ Dispatch multiple redux actions
 * ✅ Prevent multiple API calls
 * ✅ Optional navigation
 */

const useHandleMutation = () => {
  const dispatch = useDispatch();

  // Global Loading State
  const [loading, setLoading] = useState(false);

  const handleMutation = useCallback(
    async ({
      apiFunc, // RTK mutation function
      params, // API params
      dispatches = [], // Redux dispatch array
      showSuccess = false, // show success alert
      showError = true, // show error alert
      customSuccessMsg = null, // custom success message
      customErrorMsg = null, // custom error message
      timeoutMs = 8000, // request timeout
      navigateTo = null, // optional navigation function
    }) => {

      // Prevent Multiple Clicks
      if (loading) return null;

      setLoading(true);

      try {

        /**
         * Check Internet Connection
         */
        const netState = await NetInfo.fetch();
        if (!netState.isConnected) {
          throw { name: "OfflineError" };
        }

        /**
         * API Call with Timeout
         */
        const res = await withTimeout(
          (signal) => apiFunc(params, { signal }).unwrap(),
          timeoutMs
        );

        /**
         * Dispatch Redux Actions
         */
        dispatches.forEach((fn) => dispatch(fn(res)));

        /**
         * Show Success Alert
         */
        if (showSuccess) {
          dispatch(
            pushAlert({
              id: Date.now().toString(),
              type: "success",
              message:
                customSuccessMsg || res?.message || "Success",
            })
          );
        }

        /**
         * Optional Navigation
         */
        if (navigateTo && res) {
          navigateTo();
        }

        return res;

      } catch (err) {

        console.log("Mutation Error:", err);

        let message = "Something went wrong";

        /**
         * Timeout Error
         */
        if (err?.name === "AbortError") {
          message =
            "⚠️ Server is slow. Request timed out";

        /**
         * Offline Error
         */
        } else if (err?.name === "OfflineError") {
          message = "🚫 You are offline";

        /**
         * Network Error
         */
        } else if (err?.status === "FETCH_ERROR") {
          message =
            "🌐 Network error. Unable to connect";

        /**
         * Unauthorized
         */
        } else if (err?.status === 401) {
          message =
            "Session expired. Please login again";

        /**
         * Server Error
         */
        } else if (err?.status === 500) {
          message =
            "Server error. Please try later";

        /**
         * Custom Error Message
         */
        } else if (customErrorMsg) {
          message = customErrorMsg;

        /**
         * API Error Message
         */
        } else if (err?.data?.message || err?.data?.error) {
          message = err.data.message || err?.data?.error
        }

        /**
         * Show Error Alert
         */
        if (showError) {
          dispatch(
            pushAlert({
              id: Date.now().toString(),
              type: "error",
              message,
            })
          );
        }

        return null;

      } finally {

        /**
         * Small Delay (Smooth UX)
         */
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    },
    [dispatch, loading]
  );

  return {
    handleMutation,
    loading,
  };
};

export default useHandleMutation;