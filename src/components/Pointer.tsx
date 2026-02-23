import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const DefaultPointer = () => (
  <View style={styles.pointerContainer}>
    <Svg width="40" height="40" viewBox="0 0 40 40">
      <Path
        d="M20 40 L5 10 A15 15 0 1 1 35 10 Z"
        fill="#FF4B4B"
        stroke="#FFF"
        strokeWidth="2"
      />
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  pointerContainer: {
    position: "absolute",
    top: -20,
    zIndex: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
