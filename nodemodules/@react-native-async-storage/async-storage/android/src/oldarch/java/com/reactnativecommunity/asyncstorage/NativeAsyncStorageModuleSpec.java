
/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Update this file after changing NativeAsyncStorageModule.ts to match the version generated by codegen.
 */

package com.reactnativecommunity.asyncstorage;

import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactModuleWithSpec;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;

public abstract class NativeAsyncStorageModuleSpec extends ReactContextBaseJavaModule implements ReactModuleWithSpec, TurboModule {
  public NativeAsyncStorageModuleSpec(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  @DoNotStrip
  public abstract void multiGet(ReadableArray keys, Callback callback);

  @ReactMethod
  @DoNotStrip
  public abstract void multiSet(ReadableArray kvPairs, Callback callback);

  @ReactMethod
  @DoNotStrip
  public abstract void multiRemove(ReadableArray keys, Callback callback);

  @ReactMethod
  @DoNotStrip
  public abstract void multiMerge(ReadableArray kvPairs, Callback callback);

  @ReactMethod
  @DoNotStrip
  public abstract void getAllKeys(Callback callback);

  @ReactMethod
  @DoNotStrip
  public abstract void clear(Callback callback);
}
