package com.athratech.markday.location

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.location.LocationManager
import android.util.Log
import com.facebook.react.bridge.*
import com.google.android.gms.common.api.ResolvableApiException
import com.google.android.gms.location.*

class GpsModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    companion object {
        private const val TAG = "GpsModule"
        private const val REQUEST_GPS_ENABLE = 1001
    }

    private var enablePromise: Promise? = null

    init {
        reactContext.addActivityEventListener(this)
        Log.d(TAG, "✅ GpsModule initialized")
    }

    override fun getName(): String = "GpsModule"

    // ============================
    // 1️⃣ Check GPS status
    // ============================
    @ReactMethod
    fun isGpsEnabled(promise: Promise) {
        val locationManager =
            reactContext.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        val enabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)
        Log.d(TAG, "📍 isGpsEnabled -> $enabled")
        promise.resolve(enabled)
    }

    // ============================
    // 2️⃣ Enable GPS (popup)
    // ============================
    @ReactMethod
    fun enableGps(promise: Promise) {
        val activity = reactContext.currentActivity
        if (activity == null) {
            Log.e(TAG, "❌ Activity NULL")
            promise.reject("ACTIVITY_NULL", "Activity not found")
            return
        }

        enablePromise = promise
        Log.d(TAG, "📡 enableGps called")

        val request = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY,
            1000
        ).build()

        val builder = LocationSettingsRequest.Builder()
            .addLocationRequest(request)
            .setAlwaysShow(true)

        val client = LocationServices.getSettingsClient(activity)
        client.checkLocationSettings(builder.build())
            .addOnSuccessListener {
                Log.d(TAG, "✅ GPS already enabled")
                enablePromise?.resolve(true)
                enablePromise = null
            }
            .addOnFailureListener { exception ->
                if (exception is ResolvableApiException) {
                    Log.d(TAG, "⚠️ GPS OFF → showing popup")
                    exception.startResolutionForResult(activity, REQUEST_GPS_ENABLE)
                } else {
                    Log.e(TAG, "❌ GPS unavailable")
                    enablePromise?.reject("GPS_ERROR", "GPS not available")
                    enablePromise = null
                }
            }
    }

    // ============================
    // 🔥 REQUIRED OVERRIDES (EXACT SIGNATURE)
    // ============================
    override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        if (requestCode == REQUEST_GPS_ENABLE) {
            val locationManager =
                reactContext.getSystemService(Context.LOCATION_SERVICE) as LocationManager
            val enabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)

            Log.d(TAG, "📥 GPS popup result -> enabled=$enabled")

            if (enabled) {
                enablePromise?.resolve(true)
            } else {
                enablePromise?.reject("GPS_OFF", "User did not enable GPS")
            }
            enablePromise = null
        }
    }

    override fun onNewIntent(intent: Intent) {
        // required override (no-op)
    }
}
