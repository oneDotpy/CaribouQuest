"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearWatch = clearWatch;
exports.getCurrentPosition = getCurrentPosition;
exports.requestAuthorization = requestAuthorization;
exports.setRNConfiguration = setRNConfiguration;
exports.stopObserving = stopObserving;
exports.watchPosition = watchPosition;
var _nativeInterface = _interopRequireDefault(require("./nativeInterface"));
var _invariant = _interopRequireDefault(require("invariant"));
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) React Native Community
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const {
  RNCGeolocation,
  GeolocationEventEmitter
} = _nativeInterface.default;
let subscriptions = [];
let updatesEnabled = false;

/**
 * The Geolocation API extends the web spec:
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
 *
 * See https://facebook.github.io/react-native/docs/geolocation.html
 */

/*
 * Sets configuration options that will be used in all location requests.
 *
 * See https://facebook.github.io/react-native/docs/geolocation.html#setrnconfiguration
 *
 */
function setRNConfiguration(config) {
  RNCGeolocation.setConfiguration({
    ...config,
    enableBackgroundLocationUpdates: config?.enableBackgroundLocationUpdates ?? true,
    authorizationLevel: config?.authorizationLevel === 'auto' ? undefined : config.authorizationLevel,
    locationProvider: config?.locationProvider === 'auto' ? undefined : config.locationProvider
  });
}

/*
 * Requests Location permissions based on the key configured on pList.
 *
 * See https://facebook.github.io/react-native/docs/geolocation.html#requestauthorization
 */
function requestAuthorization(success = () => {}, error = _utils.logError) {
  RNCGeolocation.requestAuthorization(success, error);
}

/*
 * Invokes the success callback once with the latest location info.
 *
 * See https://facebook.github.io/react-native/docs/geolocation.html#getcurrentposition
 */
async function getCurrentPosition(success, error = _utils.logError, options = {}) {
  (0, _invariant.default)(typeof success === 'function', 'Must provide a valid geo_success callback.');
  // Permission checks/requests are done on the native side
  RNCGeolocation.getCurrentPosition(options, success, error);
}

/*
 * Invokes the success callback whenever the location changes.
 *
 * See https://facebook.github.io/react-native/docs/geolocation.html#watchposition
 */
function watchPosition(success, error = _utils.logError, options = {}) {
  if (!updatesEnabled) {
    RNCGeolocation.startObserving(options);
    updatesEnabled = true;
  }
  const watchID = subscriptions.length;
  subscriptions.push([GeolocationEventEmitter.addListener('geolocationDidChange', success), error ? GeolocationEventEmitter.addListener('geolocationError', error) : null]);
  return watchID;
}

/*
 * Unsubscribes the watcher with the given watchID.
 *
 * See https://facebook.github.io/react-native/docs/geolocation.html#clearwatch
 */
function clearWatch(watchID) {
  const sub = subscriptions[watchID];
  if (!sub) {
    // Silently exit when the watchID is invalid or already cleared
    // This is consistent with timers
    return;
  }
  sub[0].remove();
  // array element refinements not yet enabled in Flow
  const sub1 = sub[1];
  sub1 && sub1.remove();
  subscriptions[watchID] = undefined;
  let noWatchers = true;
  for (let ii = 0; ii < subscriptions.length; ii++) {
    if (subscriptions[ii]) {
      noWatchers = false; // still valid subscriptions
    }
  }
  if (noWatchers) {
    stopObserving();
  }
}

/*
 * Stops observing for device location changes and removes all registered listeners.
 *
 * See https://facebook.github.io/react-native/docs/geolocation.html#stopobserving
 */
function stopObserving() {
  if (updatesEnabled) {
    RNCGeolocation.stopObserving();
    updatesEnabled = false;
    for (let ii = 0; ii < subscriptions.length; ii++) {
      const sub = subscriptions[ii];
      if (sub) {
        (0, _utils.warning)(false, 'Called stopObserving with existing subscriptions.');
        sub[0].remove();
        // array element refinements not yet enabled in Flow
        const sub1 = sub[1];
        sub1 && sub1.remove();
      }
    }
    subscriptions = [];
  }
}
//# sourceMappingURL=implementation.native.js.map