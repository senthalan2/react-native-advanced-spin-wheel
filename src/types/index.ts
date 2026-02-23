import { ReactNode } from 'react';
import { ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { EasingFunction } from 'react-native-reanimated';

export interface SpinWheelSection {
    id: string;
    title: string;
    description?: string;
    backgroundColor: string;
    textColor?: string;
    image?: ImageSourcePropType;
}

export interface SpinWheelKnobProps {
    size?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    text?: string;
    textStyle?: TextStyle;
    renderContent?: () => ReactNode;
    shadow?: boolean;
    disabled?: boolean;
    onPress?: () => void;
    style?: ViewStyle;
}

export interface SpinWheelProps {
    sections: SpinWheelSection[];
    size?: number;
    strokeWidth?: number;
    knobProps?: SpinWheelKnobProps;
    renderKnob?: (props: SpinWheelKnobProps) => ReactNode;
    showDefaultKnob?: boolean;
    onSpinStart?: () => void;
    onSpinEnd?: (selectedSection: SpinWheelSection) => void;
    spinDuration?: number;
    numberOfSpins?: number;
    easing?: EasingFunction;
    enableSound?: boolean;
    pointerComponent?: ReactNode;
    renderSectionContent?: (section: SpinWheelSection) => ReactNode;
    disabled?: boolean;
    initialRotation?: number;
    containerStyle?: ViewStyle;
    wheelStyle?: ViewStyle;
}

export interface SpinWheelRef {
    spin: () => void;
    spinToIndex: (index: number) => void;
    reset: () => void;
}