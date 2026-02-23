import React, { memo } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { SpinWheelKnobProps } from "../types";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SpinWheelKnob: React.FC<SpinWheelKnobProps> = memo(
  ({
    size = 80,
    backgroundColor = "#FFFFFF",
    borderColor = "#E0E0E0",
    borderWidth = 4,
    text = "SPIN",
    textStyle,
    renderContent,
    shadow = true,
    disabled = false,
    loading = false,
    gradientColors,
    onPress,
    style,
  }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: disabled ? 0.6 : 1,
    }));

    const handlePressIn = () => {
      if (!disabled && !loading) scale.value = withSpring(0.9);
    };

    const handlePressOut = () => {
      if (!disabled && !loading) scale.value = withSpring(1);
    };

    const renderBackground = () => {
      if (gradientColors && gradientColors.length >= 2) {
        return (
          <View style={StyleSheet.absoluteFillObject}>
            <Svg width="100%" height="100%">
              <Defs>
                <LinearGradient id="knobGrad" x1="0" y1="0" x2="1" y2="1">
                  {gradientColors.map((color, idx) => (
                    <Stop
                      key={idx}
                      offset={`${(idx / (gradientColors.length - 1)) * 100}%`}
                      stopColor={color}
                    />
                  ))}
                </LinearGradient>
              </Defs>
              <Rect
                width="100%"
                height="100%"
                fill="url(#knobGrad)"
                rx={size / 2}
              />
            </Svg>
          </View>
        );
      }
      return (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor, borderRadius: size / 2 },
          ]}
        />
      );
    };

    return (
      <AnimatedPressable
        accessibilityRole="button"
        accessibilityState={{ disabled, busy: loading }}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth,
            borderColor,
          },
          shadow && styles.shadow,
          style,
          animatedStyle,
        ]}
        disabled={disabled || loading}
      >
        {renderBackground()}
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator color={textStyle?.color || "#000"} />
          ) : renderContent ? (
            renderContent()
          ) : (
            <Text
              style={[styles.text, textStyle]}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {text}
            </Text>
          )}
        </View>
      </AnimatedPressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    overflow: "hidden",
  },
  content: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    fontWeight: "900",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
});

export default SpinWheelKnob;
