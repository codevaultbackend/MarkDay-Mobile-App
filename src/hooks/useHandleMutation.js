import { useState, useCallback, useRef, useEffect } from "react";
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
 * ✅ Abort / Cancel support
 * ✅ Loading state
 * ✅ Success/Error alerts
 * ✅ Dispatch multiple redux actions
 * ✅ Prevent multiple API calls
 * ✅ Optional navigation
 */

const useHandleMutation = () => {

const dispatch = useDispatch()

const [loading , setLoading] = useState(false)

const requestRef = useRef(null)


const abort = useCallback(() => {

requestRef.current?.abort?.()
requestRef.current = null
setLoading(false)

},[])


const handleMutation = useCallback(

async ({

apiFunc,
params,
dispatches = [],
showSuccess = false,
showError = true,
customSuccessMsg = null,
customErrorMsg = null,
timeoutMs = 8000,
navigateTo = null

}) => {

if (loading) return null

setLoading(true)

try {

/**
 * Internet Check
 */

const netState = await NetInfo.fetch()

if (!netState.isConnected) {
throw { name:"OfflineError" }
}


/**
 * Cancel Previous Request
 */

requestRef.current?.abort?.()


/**
 * Start Request
 */

const request = apiFunc(params)

requestRef.current = request


/**
 * Timeout Wrapper
 */

const res = await withTimeout(
() => request.unwrap(),
timeoutMs
)


/**
 * Dispatch Redux
 */

dispatches.forEach(fn => dispatch(fn(res)))


/**
 * Success Alert
 */

if (showSuccess) {

dispatch(
pushAlert({
id: Date.now().toString(),
type:"success",
message:
customSuccessMsg ||
res?.message ||
"Success"
})
)

}


/**
 * Navigation
 */

if (navigateTo && res) {
navigateTo()
}

return res

} catch (err) {

console.log("Mutation Error:", err)

let message = "Something went wrong"


/**
 * Timeout
 */

if (err?.name === "AbortError") {

message =
"⚠️ Server is slow. Request timed out"


/**
 * Offline
 */

} else if (err?.name === "OfflineError") {

message = "🚫 You are offline"


/**
 * Network
 */

} else if (err?.status === "FETCH_ERROR") {

message =
"🌐 Network error. Unable to connect"


/**
 * Unauthorized
 */

} else if (err?.status === 401) {

message =
"Session expired. Please login again"


/**
 * Server Error
 */

} else if (err?.status === 500) {

message =
"Server error. Please try later"


/**
 * Custom Error
 */

} else if (customErrorMsg) {

message = customErrorMsg


/**
 * API Error
 */

} else if (err?.data?.message || err?.data?.error) {

message =
err.data.message ||
err.data.error

}


/**
 * Error Alert
 */

if (showError) {

dispatch(
pushAlert({
id: Date.now().toString(),
type:"error",
message
})
)

}

return null

} finally {

requestRef.current = null

setTimeout(()=>{
setLoading(false)
},300)

}

},

[dispatch, loading, abort]

)


/**
 * Auto Cancel on Unmount
 */

useEffect(() => {

return () => {
abort()
}

},[abort])


return {

handleMutation,
loading,
abort

}

}

export default useHandleMutation