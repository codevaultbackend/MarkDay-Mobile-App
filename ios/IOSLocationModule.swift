import Foundation
import CoreLocation
import React

@objc(IOSLocationModule)
class IOSLocationModule: NSObject, CLLocationManagerDelegate {

  // CLLocation manager (core iOS location engine)
  private let locationManager = CLLocationManager()

  // React Native Promise handlers
  private var promise: RCTPromiseResolveBlock?
  private var rejecter: RCTPromiseRejectBlock?

  // Best location store (accuracy wise)
  private var bestLocation: CLLocation?
  private var isResolved = false

  // ============================
  // CONFIG
  // ============================

  private let ACCURACY_THRESHOLD: CLLocationAccuracy = 50     // 50 meter acceptable
  private let MAX_WAIT_TIME: TimeInterval = 12                // 12 sec timeout
  private let MAX_LOCATION_AGE: TimeInterval = 15             // 15 sec freshness

  private var timeoutTimer: Timer?

  override init() {
    super.init()

    locationManager.delegate = self
    locationManager.desiredAccuracy = kCLLocationAccuracyBest
  }

  // ============================
  // ENTRY METHOD (JS CALLS THIS)
  // ============================

  @objc
  func getCurrentLocation(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    // 🔴 IMPORTANT: Prevent duplicate calls
    if promise != nil {
      print("⚠️ [IOS] Duplicate request ignored")
      return
    }

    print("🚀 [IOS] getCurrentLocation called")

    self.promise = resolve
    self.rejecter = reject

    // Check if location service enabled
    guard CLLocationManager.locationServicesEnabled() else {
      print("❌ [IOS] Location services OFF")
      reject("GPS_OFF", "Location services disabled", nil)
      return
    }

    let status = locationManager.authorizationStatus

    switch status {

    case .notDetermined:
      print("⚠️ [IOS] Requesting permission")
      locationManager.requestWhenInUseAuthorization()
      return

    case .denied, .restricted:
      print("❌ [IOS] Permission denied")
      reject("PERMISSION_DENIED", "Location permission denied", nil)
      return

    case .authorizedWhenInUse, .authorizedAlways:
      startLocationFlow()

    @unknown default:
      reject("UNKNOWN", "Unknown permission state", nil)
    }
  }

  // ============================
  // MAIN LOCATION FLOW
  // ============================

  private func startLocationFlow() {

    print("🚀 [IOS] startLocationFlow")

    bestLocation = nil
    isResolved = false

    // ============================
    // ⚡ STEP 1: LAST LOCATION (FAST)
    // ============================

    if let last = locationManager.location {

      let age = Date().timeIntervalSince(last.timestamp)

      print("⚡ [IOS] Last location -> acc=\(last.horizontalAccuracy), age=\(age)")

      // If recent + accurate → instant return
      if age < MAX_LOCATION_AGE && last.horizontalAccuracy <= ACCURACY_THRESHOLD {

        print("✅ [IOS] Using LAST LOCATION (FAST)")
        resolveSuccess(last)
        return
      }

      // Otherwise store as fallback
      bestLocation = last

    } else {
      print("❌ [IOS] No last location")
    }

    // ============================
    // ⚡ STEP 2: QUICK SINGLE REQUEST
    // ============================

    print("📡 [IOS] requestLocation()")
    locationManager.requestLocation()

    // ============================
    // 🔥 STEP 3: FALLBACK GPS (after delay)
    // ============================

    DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
      if !self.isResolved {
        print("📡 [IOS] Fallback startUpdatingLocation()")
        self.locationManager.startUpdatingLocation()
      }
    }

    // ============================
    // ⏱️ TIMEOUT (fail-safe)
    // ============================

    timeoutTimer = Timer.scheduledTimer(
      withTimeInterval: MAX_WAIT_TIME,
      repeats: false
    ) { _ in
      if !self.isResolved {
        print("⏱️ [IOS] Timeout hit")
        self.resolveLocation()
      }
    }
  }

  // ============================
  // LOCATION UPDATE CALLBACK
  // ============================

  func locationManager(
    _ manager: CLLocationManager,
    didUpdateLocations locations: [CLLocation]
  ) {

    guard let location = locations.last else { return }

    let accuracy = location.horizontalAccuracy
    let age = Date().timeIntervalSince(location.timestamp)

    print("📍 [IOS] Location update -> acc=\(accuracy), age=\(age)")

    // ignore invalid
    if accuracy < 0 { return }

    // update best location
    if bestLocation == nil || accuracy < bestLocation!.horizontalAccuracy {
      bestLocation = location
      print("✅ [IOS] Best location updated")
    }

    // if good enough → resolve
    if accuracy <= ACCURACY_THRESHOLD && age < MAX_LOCATION_AGE {
      print("🎯 [IOS] Accuracy threshold met")
      resolveSuccess(location)
    }
  }

  // ============================
  // ERROR HANDLING
  // ============================

  func locationManager(
    _ manager: CLLocationManager,
    didFailWithError error: Error
  ) {
    print("❌ [IOS] Location error: \(error.localizedDescription)")
    rejecter?("LOCATION_ERROR", error.localizedDescription, error)
    cleanup()
  }

  // ============================
  // PERMISSION CHANGE CALLBACK
  // ============================

  func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {

    let status = manager.authorizationStatus

    print("🔄 [IOS] Permission changed: \(status.rawValue)")

    if status == .authorizedWhenInUse ||
       status == .authorizedAlways {

      startLocationFlow()

    } else if status == .denied {

      rejecter?("PERMISSION_DENIED", "Location permission denied", nil)
      cleanup()
    }
  }

  // ============================
  // SUCCESS RESOLVE
  // ============================

  private func resolveSuccess(_ loc: CLLocation) {

    if isResolved { return }

    isResolved = true

    print("✅ [IOS] Location resolved SUCCESS")
    print("📍 lat=\(loc.coordinate.latitude), lng=\(loc.coordinate.longitude), acc=\(loc.horizontalAccuracy)")

    // 🔥 IMPORTANT: resolve first, cleanup later
    promise?([
      "latitude": loc.coordinate.latitude,
      "longitude": loc.coordinate.longitude,
      "accuracy": loc.horizontalAccuracy
    ])

    cleanup()
  }

  // ============================
  // FALLBACK RESOLVE
  // ============================

  private func resolveLocation() {

    if isResolved { return }

    isResolved = true

    print("⚠️ [IOS] Resolving fallback")

    if let loc = bestLocation {

      promise?([
        "latitude": loc.coordinate.latitude,
        "longitude": loc.coordinate.longitude,
        "accuracy": loc.horizontalAccuracy
      ])

    } else {

      print("❌ [IOS] No location found")

      promise?([
        "latitude": 0,
        "longitude": 0,
        "accuracy": 9999
      ])
    }

    cleanup()
  }

  // ============================
  // CLEANUP (VERY IMPORTANT)
  // ============================

  private func cleanup() {

    print("🧹 [IOS] Cleanup")

    timeoutTimer?.invalidate()
    timeoutTimer = nil

    locationManager.stopUpdatingLocation()

    // reset promise to allow next call
    promise = nil
    rejecter = nil
  }
}