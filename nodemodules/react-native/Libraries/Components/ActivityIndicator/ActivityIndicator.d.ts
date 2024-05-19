/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import type * as React from 'react';
import {Constructor} from 'react-native/types/private/Utilities';
import {NativeMethods} from 'react-native/types/public/ReactNativeTypes';
import {ColorValue, StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {LayoutChangeEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';

/**
 * @see https://reactnative.dev/docs/activityindicator#props
 */
export interface ActivityIndicatorProps extends ViewProps {
  /**
   * Whether to show the indicator (true, the default) or hide it (false).
   */
  animating?: boolean | undefined;

  /**
   * The foreground color of the spinner (default is gray).
   */
  color?: ColorValue | undefined;

  /**
   * Whether the indicator should hide when not animating (true by default).
   */
  hidesWhenStopped?: boolean | undefined;

  /**
   * Size of the indicator.
   * Small has a height of 20, large has a height of 36.
   *
   * enum('small', 'large')
   */
  size?: number | 'small' | 'large' | undefined;

  style?: StyleProp<ViewStyle> | undefined;
}

declare class ActivityIndicatorComponent extends React.Component<ActivityIndicatorProps> {}
declare const ActivityIndicatorBase: Constructor<NativeMethods> &
  typeof ActivityIndicatorComponent;
export class ActivityIndicator extends ActivityIndicatorBase {}

/**
 * @see https://reactnative.dev/docs/activityindicatorios#props
 */
export interface ActivityIndicatorIOSProps extends ViewProps {
  /**
   * Whether to show the indicator (true, the default) or hide it (false).
   */
  animating?: boolean | undefined;

  /**
   * The foreground color of the spinner (default is gray).
   */
  color?: ColorValue | undefined;

  /**
   * Whether the indicator should hide when not animating (true by default).
   */
  hidesWhenStopped?: boolean | undefined;

  /**
   * Invoked on mount and layout changes with
   */
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;

  /**
   * Size of the indicator.
   * Small has a height of 20, large has a height of 36.
   *
   * enum('small', 'large')
   */
  size?: 'small' | 'large' | undefined;

  style?: StyleProp<ViewStyle> | undefined;
}