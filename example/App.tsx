import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  SpinWheel,
  SpinWheelRefProps,
  SpinWheelSectionProps,
} from 'react-native-advanced-spin-wheel';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockSections: SpinWheelSectionProps[] = [
  {
    id: '1',
    title: '$ 100',
    backgroundColor: '#FF6B6B',
    textColor: '#FFF',
  },
  {
    id: '2',
    title: 'Try Again',
    backgroundColor: '#4ECDC4',
    textColor: '#FFF',
  },
  { id: '3', title: '$ 50', backgroundColor: '#FFE66D', textColor: '#333' },
  {
    id: '4',
    title: 'Jackpot',
    backgroundColor: '#95A5A6',
    textColor: '#FFF',
  },
  { id: '5', title: '$ 10', backgroundColor: '#F1948A', textColor: '#FFF' },
  { id: '6', title: 'Lose', backgroundColor: '#34495E', textColor: '#FFF' },
];

export default function App() {
  const wheelRef = useRef<SpinWheelRefProps>(null);
  const [result, setResult] = useState<string>('Spin to win!');

  const handleSpinEnd = (winner: SpinWheelSectionProps) => {
    setResult(`You landed on: ${winner.title}`);
  };

  const onReset = () => {
    setResult('Spin to win!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wheel of Fortune</Text>
      <Text style={styles.resultText}>{result}</Text>

      <View style={styles.wheelContainer}>
        <SpinWheel
          ref={wheelRef}
          sections={mockSections}
          size={320}
          strokeWidth={2}
          onSpinEnd={handleSpinEnd}
          onReset={onReset}
          winningIndex={1}
          knobProps={{
            text: 'PLAY',
            size: 80,
            gradientColors: ['#FFD700', '#FFA500'],
            textStyle: { color: '#FFF', fontSize: 18 },
          }}
          onTick={() => {
            console.log('TICK');
          }}
          enableSound
        />
        <TouchableOpacity
          onPress={() => {
            wheelRef.current?.spin();
          }}
          style={styles.spinButton}
        >
          <Text style={styles.spinText}>Spin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            wheelRef.current?.spinToIndex(3);
          }}
          style={[styles.spinButton, { backgroundColor: '#FF6F61' }]}
        >
          <Text style={styles.spinText}>Spin to Index</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            wheelRef.current?.reset();
          }}
          style={[styles.spinButton, { backgroundColor: '#FF0099' }]}
        >
          <Text style={styles.spinText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginBottom: 20 },
  resultText: {
    fontSize: 18,
    color: '#4ECDC4',
    marginBottom: 40,
    fontWeight: '600',
  },
  wheelContainer: { alignItems: 'center', justifyContent: 'center' },
  spinButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    marginTop: 30,
    padding: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinText: { color: 'white', fontSize: 20 },
});
