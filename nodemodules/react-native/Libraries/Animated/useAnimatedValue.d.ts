/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import type {Animated} from 'react-native/Libraries/Animated/Animated';

export function useAnimatedValue(
  initialValue: number,
  config?: Animated.AnimatedConfig,
): Animated.Value;
