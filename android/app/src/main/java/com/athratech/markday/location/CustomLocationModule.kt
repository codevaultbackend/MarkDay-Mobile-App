package com.athratech.markday.location

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.*
import com.google.android.gms.location.*

class CustomLocationModule(private val reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val TAG = "CustomLocation"
    }

    private val fusedClient = LocationServices.getFusedLocationProviderClient(reactContext)

    override fun getName(): String = "CustomLocationModule"

    // ============================
    // ⚙️ CONFIG (UrbanClap tuned)
    // ============================

    private val ACCURACY_THRESHOLD = 50f // meters
    private val MAX_WAIT_TIME = 12000L // 12 sec
    private val MAX_RETRY = 0

    // ============================
    // 🧠 Internal state
    // ============================

    private var bestLocation: WritableMap? = null
    private var locationCallback: LocationCallback? = null
    private var isResolved = false

    private var timeoutHandler: Handler? = null
    private var timeoutRunnable: Runnable? = null

    // ============================
    // 📍 MAIN ENTRY
    // ============================

    @SuppressLint("MissingPermission")
    @ReactMethod
    fun getCurrentLocation(promise: Promise) {

        val activity: Activity? = reactContext.currentActivity
        if (activity == null) {
            Log.e(TAG, "❌ Activity is NULL")
            promise.reject("ACTIVITY_NULL", "Activity not found")
            return
        }

        Log.d(TAG, "📍 getCurrentLocation called")

        // reset state
        bestLocation = null
        isResolved = false

        // ============================
        // ⚡ STEP 1: LAST LOCATION
        // ============================

        fusedClient.lastLocation
                .addOnSuccessListener { lastLoc ->
                    if (lastLoc != null) {

                        val age = System.currentTimeMillis() - lastLoc.time
                        Log.d(
                                TAG,
                                "⚡ LastLocation -> lat=${lastLoc.latitude}, lng=${lastLoc.longitude}, " +
                                        "acc=${lastLoc.accuracy}, age=${age}ms"
                        )

                        // val map = Arguments.createMap()
                        // map.putDouble("latitude", lastLoc.latitude)
                        // map.putDouble("longitude", lastLoc.longitude)
                        // map.putDouble("accuracy", lastLoc.accuracy.toDouble())

                        // bestLocation = map

                        // 🚀 FAST PATH
                        // if (lastLoc.accuracy <= ACCURACY_THRESHOLD) {
                        //     Log.d(TAG, "🚀 LastLocation accurate enough, resolving immediately")
                        //     promise.resolve(map)
                        //     return@addOnSuccessListener
                        // }

                        // ✅ accept ONLY fresh + accurate location
                        if (age < 15_000 && lastLoc.accuracy <= ACCURACY_THRESHOLD) {

                            val map = Arguments.createMap()
                            map.putDouble("latitude", lastLoc.latitude)
                            map.putDouble("longitude", lastLoc.longitude)
                            map.putDouble("accuracy", lastLoc.accuracy.toDouble())

                            bestLocation = map
                            isResolved = true
                              stopUpdates() // 🔥 ADD THIS LINE (future-safe)
                            Log.d(TAG, "🚀 Fresh + accurate lastLocation accepted")
                            promise.resolve(map)
                            return@addOnSuccessListener
                        }

                        Log.d(TAG, "⚠️ LastLocation ignored (old or inaccurate)")
                    } else {
                        Log.d(TAG, "⚠️ LastLocation is NULL")
                    }

                    // ============================
                    // 🔥 STEP 2: GPS UPDATES
                    // ============================

                    startGpsUpdates(activity, promise)
                }
                .addOnFailureListener {
                    Log.e(TAG, "❌ Failed to get lastLocation: ${it.message}")
                    startGpsUpdates(activity, promise)
                }
    }

    // ============================
    // 📡 GPS Updates
    // ============================

    @SuppressLint("MissingPermission")
    private fun startGpsUpdates(activity: Activity, promise: Promise) {
        // 🔥 IMPORTANT: clear any old timeout
        timeoutHandler?.removeCallbacksAndMessages(null)
        Log.d(TAG, "📡 Starting GPS updates")

        val request =
                LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 1000)
                        .setMinUpdateDistanceMeters(0f)
                        .setWaitForAccurateLocation(true)
                        .build()

        locationCallback =
                object : LocationCallback() {

                    override fun onLocationResult(result: LocationResult) {
                        if (isResolved) return

                        val loc = result.lastLocation ?: return
                        val accuracy = loc.accuracy

                        Log.d(
                                TAG,
                                "📡 GPS update -> lat=${loc.latitude}, lng=${loc.longitude}, acc=$accuracy"
                        )

                        val map = Arguments.createMap()
                        map.putDouble("latitude", loc.latitude)
                        map.putDouble("longitude", loc.longitude)
                        map.putDouble("accuracy", accuracy.toDouble())

                        if (bestLocation == null ||
                                        accuracy < bestLocation!!.getDouble("accuracy").toFloat()
                        ) {
                            bestLocation = map
                            Log.d(TAG, "✅ Best location updated (acc=$accuracy)")
                        }

                        // 🎯 ACCURATE ENOUGH
                        if (accuracy <= ACCURACY_THRESHOLD) {
                            Log.d(TAG, "🎯 Accuracy threshold met, resolving")
                            resolve(promise)
                        }
                    }
                }

        fusedClient.requestLocationUpdates(request, locationCallback!!, activity.mainLooper)

        // ============================
        // ⏱️ TIMEOUT
        // ============================

        timeoutHandler = Handler(Looper.getMainLooper())
        timeoutRunnable = Runnable {
            if (!isResolved) {
                Log.w(TAG, "⏱️ Timeout hit, resolving best available location")
                resolve(promise)
            }
        }

        timeoutHandler?.postDelayed(timeoutRunnable!!, MAX_WAIT_TIME)
    }

    // ============================
    // 🎯 FINAL RESOLVE
    // ============================

    private fun resolve(promise: Promise) {
        if (isResolved) return
        isResolved = true

        stopUpdates()
        timeoutRunnable?.let { timeoutHandler?.removeCallbacks(it) }

        if (bestLocation != null) {
            Log.d(TAG, "✅ Location resolved successfully")
            promise.resolve(bestLocation)
        } else {
            Log.e(TAG, "❌ No location found, returning dummy")
            val map = Arguments.createMap()
            map.putDouble("latitude", 0.0)
            map.putDouble("longitude", 0.0)
            map.putDouble("accuracy", 9999.0)
            promise.resolve(map)
        }
    }

    // ============================
    // 🔋 STOP UPDATES
    // ============================

    private fun stopUpdates() {
        if (locationCallback != null) {
            Log.d(TAG, "🔋 Stopping GPS updates")
            fusedClient.removeLocationUpdates(locationCallback!!)
            locationCallback = null
        }
    }
}
