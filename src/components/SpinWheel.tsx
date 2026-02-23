import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { StyleSheet, Vibration, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets'; // <-- Imported updated method
import Svg, { G, Path, Text as SvgText, Image as SvgImage } from 'react-native-svg';
import { SpinWheelProps, SpinWheelRefProps } from '../types';
import { createSlicePath, polarToCartesian } from '../utils/math';
import { DefaultPointer } from './Pointer';
import SpinWheelKnob from './SpinWheelKnob';

// Helper function to smartly wrap and truncate text based on geometric limits
const getWrappedText = (text: string, maxChars: number): string[] => {
  if (!text) return [];
  if (maxChars <= 3) return [text.substring(0, maxChars)]; // Extreme narrow slice fallback

  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // If a single word is longer than the entire line, hard slice it
    if (word.length > maxChars) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = '';
      }
      lines.push(word.substring(0, maxChars - 3) + '...');
      continue;
    }

    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxChars) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  
  if (currentLine) lines.push(currentLine);

  // Enforce Max 2 Lines & append "..." if text is longer
  if (lines.length > 2) {
    let secondLine = lines[1];
    if (secondLine.length > maxChars - 3) {
      secondLine = secondLine.substring(0, maxChars - 3) + '...';
    } else if (!secondLine.endsWith('...')) {
      secondLine += '...';
    }
    return [lines[0], secondLine];
  }

  return lines;
};

export const SpinWheel = forwardRef<SpinWheelRefProps, SpinWheelProps>(({
  sections,
  size = 300,
  strokeWidth = 0,
  knobProps,
  renderKnob,
  showDefaultKnob = true,
  onSpinStart,
  onSpinEnd,
  onReset,
  onTick,
  spinDuration = 4000,
  numberOfSpins = 5,
  easing = Easing.out(Easing.cubic),
  enableSound = false,
  enableHaptics = false,
  pointerComponent,
  disabled = false,
  initialRotation = 0,
  initialRotationIndex,
  winningIndex,
  containerStyle,
  wheelStyle,
  titleStyle,
  descriptionStyle,
}, ref) => {

  const radius = size / 2;
  const angleBySegment = 360 / sections.length;

  const startingRotation = (initialRotationIndex !== undefined && initialRotationIndex < sections?.length)
    ? (360 - (initialRotationIndex * angleBySegment)) % 360 
    : initialRotation;

  const rotation = useSharedValue(startingRotation);
  const winScale = useSharedValue(1);
  const [isSpinning, setIsSpinning] = useState(false);



  useAnimatedReaction(
    () => {
      // Calculate which slice is currently passing the top pointer (0 degrees)
      const currentAngle = (rotation.value % 360 + 360) % 360;
      return Math.floor((360 - currentAngle + angleBySegment / 2) / angleBySegment) % sections.length;
    },
    (currentIndex, previousIndex) => {
      // If the index changes, the wheel has "ticked" to a new slice!
      if (previousIndex !== null && currentIndex !== previousIndex) {
        if (enableSound && onTick) {
          scheduleOnRN(onTick); // Fire external sound function
        }
        if (enableHaptics && isSpinning) {
          // Play a very light haptic click as it spins (optional but feels great!)
          scheduleOnRN(Vibration.vibrate, 10); 
        }
      }
    }
  );

  const performSpin = useCallback((targetIndex: number) => {
    if (isSpinning || disabled) return;
    setIsSpinning(true);
    if (onSpinStart) onSpinStart();

    const currentAngle = rotation.value % 360;
    const targetAngle = targetIndex * angleBySegment;
    const angleDifference = 360 - currentAngle - targetAngle;
    const randomOffset = (Math.random() - 0.5) * (angleBySegment * 0.7);
    const finalAngle = rotation.value + angleDifference + (360 * numberOfSpins) + randomOffset;

    rotation.value = withTiming(finalAngle, { duration: spinDuration, easing }, (finished) => {
      if (finished) {
        scheduleOnRN(setIsSpinning, false);
        
        if (enableHaptics) {
          scheduleOnRN(Vibration.vibrate, [0, 100, 100, 100]); // Heavier vibration on win
        }
        
        winScale.value = withSpring(1.05, {}, () => {
          winScale.value = withSpring(1);
        });
        
        if (onSpinEnd) {
          scheduleOnRN(onSpinEnd, sections[targetIndex]);
        }
      }
    });
  }, [
    isSpinning, disabled, onSpinStart, rotation, angleBySegment,
    numberOfSpins, enableHaptics, spinDuration, easing, onSpinEnd, sections, winScale
  ]);

  useImperativeHandle(ref, () => ({
    spin: () => {
      const target = winningIndex  ?? Math.floor(Math.random() * sections.length);
      performSpin(target);
    },
    spinToIndex: (index: number) => {
      performSpin(index);
    },
    reset: () => {
      rotation.value = startingRotation;
      setIsSpinning(false);
       if (onReset) {
        onReset();
      }
    },
  }));

  const animatedWheelStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: winScale.value }],
  }));

  return (
    <View style={[styles.wrapper, containerStyle, { width: size, height: size }]}>
      {pointerComponent || <DefaultPointer />}

      <Animated.View style={[{ width: size, height: size, borderRadius: radius, overflow: 'hidden' }, wheelStyle, animatedWheelStyle]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G x={radius} y={radius}>
            {sections.map((section, i) => {
              const startAngle = i * angleBySegment - angleBySegment / 2;
              const endAngle = i * angleBySegment + angleBySegment / 2;
              const path = createSlicePath(0, 0, radius, startAngle, endAngle);

              const hasImage = !!section.image;
              const hasDescription = !!section.description;
              const imageSize = radius * 0.25;
              
              let titleRadius = radius * 0.75;
              let descRadius = radius * 0.55;
              let imgRadius = radius * 0.40;

              if (hasImage && hasDescription) {
                titleRadius = radius * 0.85;
                descRadius = radius * 0.65;
                imgRadius = radius * 0.40;
              } else if (hasImage && !hasDescription) {
                titleRadius = radius * 0.80; 
                imgRadius = radius * 0.50;   
              } else if (!hasImage && hasDescription) {
                titleRadius = radius * 0.80; 
                descRadius = radius * 0.60;  
              }

              const imgPos = polarToCartesian(0, 0, imgRadius, i * angleBySegment);
              const titlePos = polarToCartesian(0, 0, titleRadius, i * angleBySegment);
              const descPos = polarToCartesian(0, 0, descRadius, i * angleBySegment);

              const titleFontSize = titleStyle?.fontSize ?? radius * 0.12;
              const descFontSize = descriptionStyle?.fontSize ?? radius * 0.07;

              const titleChord = 2 * titleRadius * Math.sin((angleBySegment / 2) * (Math.PI / 180));
              const descChord = 2 * descRadius * Math.sin((angleBySegment / 2) * (Math.PI / 180));

              const maxTitleChars = Math.max(1, Math.floor((titleChord * 0.85) / (titleFontSize * 0.55)));
              const maxDescChars = Math.max(1, Math.floor((descChord * 0.85) / (descFontSize * 0.55)));

              const wrappedTitle = getWrappedText(section.title, maxTitleChars);
              const wrappedDesc = section.description ? getWrappedText(section.description, maxDescChars) : [];

              return (
                <G key={section.id}>
                  {/* Background Slice */}
                  <Path d={path} fill={section.backgroundColor} stroke="#fff" strokeWidth={strokeWidth} />

                  {/* Optional Image */}
                  {section.image && (
                    <SvgImage
                      x={imgPos.x - imageSize / 2}
                      y={imgPos.y - imageSize / 2}
                      width={imageSize}
                      height={imageSize}
                      href={section.image}
                      preserveAspectRatio="xMidYMid meet"
                      transform={`rotate(${i * angleBySegment}, ${imgPos.x}, ${imgPos.y})`}
                    />
                  )}

                  {/* Optional Description Text (Up to 2 lines) */}
                  {wrappedDesc.length > 0 && (
                    <G transform={`rotate(${i * angleBySegment}, ${descPos.x}, ${descPos.y})`}>
                      {wrappedDesc.map((line, lineIndex) => {
                        const yOffset = wrappedDesc.length === 1 
                          ? 0 
                          : (lineIndex === 0 ? -descFontSize * 0.6 : descFontSize * 0.6);
                        return (
                          <SvgText
                            key={`desc-${lineIndex}`}
                            x={descPos.x}
                            y={descPos.y + yOffset}
                            fill={descriptionStyle?.color || section.textColor || '#fff'}
                            fontSize={descFontSize}
                            fontFamily={descriptionStyle?.fontFamily}
                            fontWeight={descriptionStyle?.fontWeight ?? 'normal'}
                            fontStyle={descriptionStyle?.fontStyle}
                            letterSpacing={descriptionStyle?.letterSpacing}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            {line}
                          </SvgText>
                        );
                      })}
                    </G>
                  )}

                  {/* Title Text (Up to 2 lines) */}
                  {wrappedTitle.length > 0 && (
                    <G transform={`rotate(${i * angleBySegment}, ${titlePos.x}, ${titlePos.y})`}>
                      {wrappedTitle.map((line, lineIndex) => {
                        const yOffset = wrappedTitle.length === 1 
                          ? 0 
                          : (lineIndex === 0 ? -titleFontSize * 0.6 : titleFontSize * 0.6);
                        return (
                          <SvgText
                            key={`title-${lineIndex}`}
                            x={titlePos.x}
                            y={titlePos.y + yOffset}
                            fill={titleStyle?.color || section.textColor || '#fff'}
                            fontSize={titleFontSize}
                            fontFamily={titleStyle?.fontFamily}
                            fontWeight={titleStyle?.fontWeight ?? 'bold'}
                            fontStyle={titleStyle?.fontStyle}
                            letterSpacing={titleStyle?.letterSpacing}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            {line}
                          </SvgText>
                        );
                      })}
                    </G>
                  )}
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>

      {/* Knob Container */}
      {showDefaultKnob && !renderKnob && (
        <View pointerEvents="box-none" style={styles.knobContainer}>
          <SpinWheelKnob
            disabled={isSpinning || disabled}
            onPress={() => {
              const target = winningIndex  ?? Math.floor(Math.random() * sections.length);
              performSpin(target);
            }}
            {...knobProps}
          />
        </View>
      )}

      {renderKnob && (
        <View pointerEvents="box-none" style={styles.knobContainer}>
          {renderKnob({
            disabled: isSpinning || disabled,
            onPress: () => performSpin(winningIndex ?? Math.floor(Math.random() * sections.length)),
            ...knobProps,
          })}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  knobContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  }
});
