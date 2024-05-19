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
import {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';

/**
 * Renders nested content and automatically applies paddings reflect the portion of the view
 * that is not covered by navigation bars, tab bars, toolbars, and other ancestor views.
 * Moreover, and most importantly, Safe Area's paddings reflect physical limitation of the screen,
 * such as rounded corners or camera notches (aka sensor housing area on iPhone X).
 */
declare class SafeAreaViewComponent extends React.Component<ViewProps> {}
declare const SafeAreaViewBase: Constructor<NativeMethods> &
  typeof SafeAreaViewComponent;
export class SafeAreaView extends SafeAreaViewBase {}
