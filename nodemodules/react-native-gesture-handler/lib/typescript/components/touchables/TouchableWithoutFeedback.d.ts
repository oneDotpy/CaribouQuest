import * as React from 'react';
import GenericTouchable, { GenericTouchableProps } from './GenericTouchable';
export type TouchableWithoutFeedbackProps = GenericTouchableProps;
declare const TouchableWithoutFeedback: React.ForwardRefExoticComponent<GenericTouchableProps & {
    children?: React.ReactNode;
} & React.RefAttributes<GenericTouchable>>;
export default TouchableWithoutFeedback;
