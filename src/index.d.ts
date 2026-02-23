import { ComponentType, ReactNode } from 'react';
import { ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { EasingFunction } from 'react-native-reanimated';
declare module 'react-native-advanced-spin-wheel' {

    /**
    * Defines the style properties for text rendered inside the SVG wheel slices.
    */
    export interface WheelTextStyleProps {
        /** The size of the font. */
        fontSize?: number;
        /** The font family to use. */
        fontFamily?: string;
        /** The thickness of the text. */
        fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
        /** The style of the font (e.g., italic). */
        fontStyle?: 'normal' | 'italic';
        /** The color of the text. Overrides `textColor` in `SpinWheelSectionProps`. */
        color?: string;
        /** The spacing between letters. */
        letterSpacing?: number;
    }

    /**
     * Represents a single slice/section on the Spin Wheel.
     */
    export interface SpinWheelSectionProps {
        /** Unique identifier for the section. */
        id: string;
        /** Main text to display prominently on the slice. */
        title: string;
        /** Optional secondary text displayed closer to the center of the wheel. */
        description?: string;
        /** The background color of the slice (Hex, RGB, or RGBA). */
        backgroundColor: string;
        /** The specific text color for this slice. Falls back to global styles if not provided. */
        textColor?: string;
        /** Optional image to render at the innermost radius of the slice. */
        image?: ImageSourcePropType;
    }


    /**
     * Configuration props for the default center knob (button).
     */
    export interface SpinWheelKnobProps {
        /** The diameter of the knob in pixels. Default is 80. */
        size?: number;
        /** The solid background color of the knob. Default is '#FFFFFF'. */
        backgroundColor?: string;
        /** The border color of the knob. Default is '#E0E0E0'. */
        borderColor?: string;
        /** The border width of the knob. Default is 4. */
        borderWidth?: number;
        /** The text displayed inside the knob. Default is 'SPIN'. */
        text?: string;
        /** Additional React Native Text styles applied to the knob text. */
        textStyle?: TextStyle;
        /** Custom function to render complex content inside the knob instead of basic text. */
        renderContent?: () => ReactNode;
        /** Whether to show a drop shadow behind the knob. Default is true. */
        shadow?: boolean;
        /** Whether the knob is currently disabled from being pressed. */
        disabled?: boolean;
        /** Whether the knob should display a loading indicator. */
        loading?: boolean;
        /** Array of colors to create a linear gradient background for the knob. Overrides `backgroundColor`. */
        gradientColors?: string[];
        /** Callback fired when the knob is pressed. */
        onPress?: () => void;
        /** Additional React Native View styles for the knob container. */
        style?: ViewStyle;
    }

    /**
     * The main configuration props for the SpinWheel component.
     */
    export interface SpinWheelProps {
        /** Array of objects defining each wheel slice. */
        sections: SpinWheelSectionProps[];
        /** The total diameter of the wheel in pixels. Default is 300. */
        size?: number;
        /** The width of the border line separating each slice. Default is 0. */
        strokeWidth?: number;
        /** Configuration object for the default center knob. */
        knobProps?: SpinWheelKnobProps;
        /** Custom render function to completely replace the center knob component. */
        renderKnob?: (props: SpinWheelKnobProps) => ReactNode;
        /** Whether to render the default center knob. Default is true. */
        showDefaultKnob?: boolean;
        /** Callback fired immediately when the wheel starts spinning. */
        onSpinStart?: () => void;
        /** Callback fired when the spin animation completely stops. Returns the winning section. */
        onSpinEnd?: (selectedSection: SpinWheelSectionProps) => void;
        /** Callback fired immediately after the wheel is reset to its initial state via the ref method. */
        onReset?: () => void;
        /** Callback fired every time a slice passes the top pointer. Ideal for playing tick sounds. */
        onTick?: () => void;
        /** The duration of the entire spin animation in milliseconds. Default is 4000. */
        spinDuration?: number;
        /** How many full 360-degree rotations the wheel makes before starting to brake. Default is 5. */
        numberOfSpins?: number;
        /** Custom Reanimated easing function for the spin. Default is `Easing.out(Easing.cubic)`. */
        easing?: EasingFunction;
        /** Enables the `onTick` callback to fire so you can play custom audio. Default is false. */
        enableSound?: boolean;
        /** Triggers haptic feedback during the spin and when the wheel stops. Default is false. */
        enableHaptics?: boolean;
        /** Custom React element to replace the default downward-pointing arrow at the top. */
        pointerComponent?: ReactNode;
        /** Custom render function to overlay content on the slice. (Advanced Usage) */
        renderSectionContent?: (section: SpinWheelSectionProps) => ReactNode;
        /** Disables interactions with the wheel and prevents spinning. */
        disabled?: boolean;
        /** The starting rotation of the wheel in degrees. Default is 0. */
        initialRotation?: number;
        /** 
         * The specific array index that should be positioned at the top pointer when the wheel first renders.
         * If provided, this overrides `initialRotation`.
         */
        initialRotationIndex?: number;
        /** The specific array index the wheel is rigged to stop at. If undefined, the outcome is random. */
        winningIndex?: number;
        /** Styling applied to the outermost wrapper View of the component. */
        containerStyle?: ViewStyle;
        /** Styling applied directly to the Animated View containing the SVG wheel. */
        wheelStyle?: ViewStyle;
        /** Global typography styles applied to all section titles. */
        titleStyle?: WheelTextStyleProps;
        /** Global typography styles applied to all section descriptions. */
        descriptionStyle?: WheelTextStyleProps;
    }


    /**
     * Methods exposed via the `ref` attached to the SpinWheel component.
     */
    export interface SpinWheelRefProps {
        /** 
        * Triggers a spin programmatically. 
        * Will target `winningIndex` if provided, otherwise targets a random index. 
        */
        spin: () => void;
        /** 
         * Triggers a spin programmatically that guarantees stopping at the specified index. 
         * @param index The array index of the sections array to stop at.
         */
        spinToIndex: (index: number) => void;
        /** 
         * Immediately resets the wheel's rotation to the `initialRotation` without animation. 
         */
        reset: () => void;
    }

    export const SpinWheel: ComponentType<SpinWheelProps & { ref?: React.Ref<SpinWheelRefProps> }>;
    export const SpinWheelKnob: ComponentType<SpinWheelKnobProps>;
}