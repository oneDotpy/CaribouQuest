"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlingGesture = void 0;

var _gesture = require("./gesture");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FlingGesture extends _gesture.BaseGesture {
  constructor() {
    super();

    _defineProperty(this, "config", {});

    this.handlerName = 'FlingGestureHandler';
  }
  /**
   * Determine exact number of points required to handle the fling gesture.
   * @param pointers
   */


  numberOfPointers(pointers) {
    this.config.numberOfPointers = pointers;
    return this;
  }
  /**
   * Expressed allowed direction of movement.
   * Expected values are exported as constants in the Directions object.
   * Arguments can be combined using `|` operator. Default value is set to `MouseButton.LEFT`.
   * @param direction
   * @see https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/fling-gesture/#directionvalue-directions
   */


  direction(direction) {
    this.config.direction = direction;
    return this;
  }

}

exports.FlingGesture = FlingGesture;
//# sourceMappingURL=flingGesture.js.map