#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(IOSLocationModule, NSObject)

RCT_EXTERN_METHOD(getCurrentLocation:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end