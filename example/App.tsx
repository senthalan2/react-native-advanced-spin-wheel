import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  SpinWheel,
  SpinWheelRef,
  SpinWheelSection,
} from "react-native-advanced-spin-wheel";

const sections: SpinWheelSection[] = [
  { id: "1", title: "$100", backgroundColor: "#E25B5F" },
  { id: "2", title: "Try Again", backgroundColor: "#F9A03F" },
  { id: "3", title: "$500", backgroundColor: "#F7D047" },
  { id: "4", title: "Lose Turn", backgroundColor: "#9BDE7E" },
  { id: "5", title: "$1000", backgroundColor: "#4CB5AB" },
  { id: "6", title: "Jackpot", backgroundColor: "#387D7A" },
];

export default function App() {
  const wheelRef = useRef<SpinWheelRef>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const handleSpinEnd = (section: SpinWheelSection) => {
    setWinner(section.title);
    Alert.alert("Spin Finished!", `You landed on: ${section.title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fortune Wheel</Text>

      <View style={styles.wheelContainer}>
        <SpinWheel
          ref={wheelRef}
          size={320}
          sections={sections}
          onSpinEnd={handleSpinEnd}
          knobProps={{
            text: "GO!",
            size: 80,
            backgroundColor: "#fff",
          }}
        />
      </View>

      <Text style={styles.resultText}>Last Winner: {winner || "None yet"}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Spin Programmatically"
          onPress={() => wheelRef.current?.spin()}
        />
        <Button
          title="Force Jackpot"
          onPress={() => wheelRef.current?.spinToIndex(5)}
          color="#387D7A"
        />
        <Button
          title="Reset"
          onPress={() => wheelRef.current?.reset()}
          color="red"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  wheelContainer: {
    marginVertical: 20,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff",
  },
  buttonContainer: {
    marginTop: 30,
    gap: 15,
  },
});
