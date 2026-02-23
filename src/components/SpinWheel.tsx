import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { G, Polygon } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { SpinWheelProps, SpinWheelRef } from "../types";
import { SpinWheelKnob } from "./SpinWheelKnob";
import { SpinWheelSlice } from "./SpinWheelSlice";

export const SpinWheel = forwardRef<SpinWheelRef, SpinWheelProps>(
  (
    {
      sections,
      size = 300,
      strokeWidth = 2,
      knobProps,
      renderKnob,
      showDefaultKnob = true,
      onSpinStart,
      onSpinEnd,
      spinDuration = 4000,
      numberOfSpins = 5,
      easing = Easing.out(Easing.cubic),
      pointerComponent,
      disabled = false,
      initialRotation = 0,
      containerStyle,
      wheelStyle,
    },
    ref,
  ) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const rotation = useSharedValue(initialRotation);

    const radius = size / 2;
    const sliceAngle = 360 / sections.length;

    // We offset the start by -90 degrees so that slice 0 starts at the 12 o'clock position
    const visualOffset = -90;

    const animateToAngle = (targetAngle: number, winningIndex: number) => {
      setIsSpinning(true);
      onSpinStart?.();

      rotation.value = withTiming(
        targetAngle,
        { duration: spinDuration, easing },
        () => {
          runOnJS(setIsSpinning)(false);
          if (onSpinEnd) {
            runOnJS(onSpinEnd)(sections[winningIndex]);
          }
        },
      );
    };

    const spinToIndex = (index: number) => {
      if (isSpinning || disabled) return;

      // Calculate target angle to land the center of the requested slice at 12 o'clock.
      // 360 - (index * sliceAngle) handles the reverse math of clockwise rotation
      // - (sliceAngle / 2) centers it.
      const targetOffset = 360 - index * sliceAngle - sliceAngle / 2;
      const totalRotation = rotation.value + 360 * numberOfSpins + targetOffset;

      animateToAngle(totalRotation, index);
    };

    const spin = () => {
      if (isSpinning || disabled) return;
      const randomIndex = Math.floor(Math.random() * sections.length);
      spinToIndex(randomIndex);
    };

    const reset = () => {
      rotation.value = initialRotation;
      setIsSpinning(false);
    };

    useImperativeHandle(ref, () => ({
      spin,
      spinToIndex,
      reset,
    }));

    const animatedWheelStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.value}deg` }],
      };
    });

    return (
      <View
        style={[
          styles.container,
          { width: size, height: size },
          containerStyle,
        ]}
      >
        {/* Default SVG Pointer */}
        <View style={styles.pointerContainer}>
          {pointerComponent ? (
            pointerComponent
          ) : (
            <Svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              style={styles.pointerSvg}
            >
              <Polygon points="20,10 80,10 50,80" fill="#FF4B4B" />
            </Svg>
          )}
        </View>

        {/* The Animated Wheel */}
        <Animated.View
          style={[
            styles.wheelWrapper,
            { width: size, height: size },
            wheelStyle,
            animatedWheelStyle,
          ]}
        >
          <Svg width={size} height={size}>
            <G rotation={visualOffset} origin={`${radius}, ${radius}`}>
              {sections.map((section, index) => (
                <SpinWheelSlice
                  key={section.id}
                  index={index}
                  section={section}
                  radius={radius}
                  startAngle={index * sliceAngle}
                  sliceAngle={sliceAngle}
                  strokeWidth={strokeWidth}
                />
              ))}
            </G>
          </Svg>
        </Animated.View>

        {/* The Center Knob */}
        {showDefaultKnob && (
          <SpinWheelKnob
            disabled={isSpinning || disabled}
            onPress={spin}
            {...knobProps}
          />
        )}
        {renderKnob &&
          !showDefaultKnob &&
          renderKnob({ disabled: isSpinning || disabled, onPress: spin })}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  wheelWrapper: {
    borderRadius: 9999,
    overflow: "hidden",
  },
  pointerContainer: {
    position: "absolute",
    top: -20,
    zIndex: 20,
    alignItems: "center",
  },
  pointerSvg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
