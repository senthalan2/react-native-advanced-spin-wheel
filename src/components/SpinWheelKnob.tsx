import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SpinWheelKnobProps } from "../types";

export const SpinWheelKnob: React.FC<SpinWheelKnobProps> = ({
  size = 80,
  backgroundColor = "#ffffff",
  borderColor = "#333333",
  borderWidth = 4,
  text = "SPIN",
  textStyle,
  renderContent,
  shadow = true,
  disabled = false,
  onPress,
  style,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled) scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    if (!disabled) scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.knob,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            borderColor,
            borderWidth,
            opacity: disabled ? 0.6 : 1,
          },
          shadow && styles.shadow,
        ]}
      >
        {renderContent ? (
          renderContent()
        ) : (
          <Text style={[styles.text, textStyle]}>{text}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  knob: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontWeight: "900",
    fontSize: 16,
    color: "#333",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
