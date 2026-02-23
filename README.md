
# 🎡 react-native-advanced-spin-wheel  
  
`react-native-advanced-spin-wheel` is a fully customizable spin wheel component designed for React Native.  
Create smooth, physics-driven rotations with interactive slices, customizable center knobs, and optional haptic or audio feedback.  
Ideal for enhancing your app’s UI with engaging, animated wheel interfaces that respond to user input.

---  
  
## 🌟 Features  
  
- 🎨 **Customizable slices** – display text, colors, and images per slice.  
- 🎯 **Center knob control** – adjustable size, text, gradients, shadow, or custom content.  
- 🌀 **Smooth physics-based spin animations** – configurable duration, easing, and spins.  
- 🔔 **Tick events** – fire callbacks as slices pass the top pointer (great for custom sounds).  
- 🤏 **Haptic feedback** – optional tactile feedback during spin and at the end.  
- 🖌 **Flexible styling** – style the wheel container, slices, titles, descriptions, and knob.  
- 🔄 **Programmatic control** – spin, spin to a specific index, or reset using refs.   
  
---  

## 🎯 Demo


Check out the `SpinWheel` in action with different styles:  
  
| Demo 1 | Demo 2 |  
|--------|--------|  
| ![SpinWheel Demo in Android](https://github.com/senthalan2/react-native-advanced-spin-wheel/blob/main/Assets/Android_Recording.gif) | ![SpinWheel Demo in IOS](https://github.com/senthalan2/react-native-advanced-spin-wheel/blob/main/Assets/IOS_Recording.gif) |
  
  
## ⚡ Installation  
  
```bash   
npm install react-native-advanced-spin-wheel react-native-reanimated react-native-svg  
  ```

> Make sure **[react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)** is set up correctly with the Babel plugin.

----------

## 🎨 Basic Usage

```bash   
import  React, { useRef, useState } from  'react';  
import { Text, View } from  'react-native';  
import { SpinWheel, SpinWheelRefProps, SpinWheelSectionProps } from  'react-native-advanced-spin-wheel';  
  
const  sections: SpinWheelSectionProps[] = [  
 { id: '1', title: '$100', backgroundColor: '#FF6B6B', textColor: '#FFF' },  
 { id: '2', title: 'Try Again', backgroundColor: '#4ECDC4', textColor: '#FFF' },  
 { id: '3', title: '$50', backgroundColor: '#FFE66D', textColor: '#333' },  
 { id: '4', title: 'Jackpot', backgroundColor: '#95A5A6', textColor: '#FFF' },  
];  
  
export  default  function  App() {  
  const  wheelRef  =  useRef<SpinWheelRefProps>(null);  
  const [result, setResult] =  useState('Spin to win!');  
  
  return (  
  <View>  
  <Text>{result}</Text>  
  
  <SpinWheel  
  ref={wheelRef}  
  sections={sections}  
  size={300}  
  strokeWidth={2}  
  onSpinEnd={(winner) => setResult(`You landed on: ${winner.title}`)}  
  onReset={() => setResult('Spin to win!')}  
  knobProps={{ text: 'PLAY', size: 80 }}  
  />  
  </View>  
 );  
}
```
----------

## 🧩 Props

### SpinWheelProps 🎢  
  
| Prop | Type | Default | Description |  
|------|------|---------|-------------|  
| `sections` | [`SpinWheelSectionProps`](https://github.com/senthalan2/react-native-advanced-spin-wheel?tab=readme-ov-file#spinwheelsectionprops-)[] |  | Array of wheel slices. **Required.** |  
| `size` | `number` | 300 | Diameter of the wheel in pixels. |  
| `strokeWidth` | `number` | 0 | Width of the border line separating each slice. |  
| `knobProps` | [`SpinWheelKnobProps`](https://github.com/senthalan2/react-native-advanced-spin-wheel?tab=readme-ov-file#spinwheelknobprops-) | | Configuration object for the default center knob. |  
| `renderKnob` | `(props: SpinWheelKnobProps) => ReactNode` |  | Custom render function to fully replace the center knob. |  
| `showDefaultKnob` | `boolean` | true | Whether to render the default center knob. |  
| `onSpinStart` | `() => void` |  | Callback fired immediately when the wheel starts spinning. |  
| `onSpinEnd` | `(selectedSection: SpinWheelSectionProps) => void` |  | Callback fired when the spin animation stops. Returns the winning section. |  
| `onReset` | `() => void` |  | Callback fired immediately after the wheel is reset via the ref method. |  
| `onTick` | `() => void` |  | Callback fired every time a slice passes the top pointer (useful for tick sounds). |  
| `spinDuration` | `number` | 4000 | Duration of the entire spin animation in milliseconds. |  
| `numberOfSpins` | `number` | 5 | Number of full 360-degree rotations before braking. |  
| `easing` | `EasingFunction` | `Easing.out (Easing.cubic)` | Custom Reanimated easing function for the spin animation. |  
| `enableSound` | `boolean` | false | Enables `onTick` callback for playing custom audio. |  
| `enableHaptics` | `boolean` | false | Triggers haptic feedback during the spin and when the wheel stops. |  
| `pointerComponent` | `ReactNode` |  | Custom React element to replace the default downward-pointing arrow at the top. |  
| `renderSectionContent` | `(section: SpinWheelSectionProps) => ReactNode` |  | Custom render function to overlay content on each slice (advanced usage). |  
| `disabled` | `boolean` | false | Disables interactions and prevents spinning. |  
| `initialRotation` | `number` | 0 | Starting rotation of the wheel in degrees. |  
| `initialRotationIndex` | `number` |  | Specific slice index positioned at the top pointer on initial render. Overrides `initialRotation`. |  
| `winningIndex` | `number` | | Specific slice index the wheel is rigged to stop at. If undefined, outcome is random. |  
| `containerStyle` | `ViewStyle` |  | Styling applied to the outermost wrapper View. |  
| `wheelStyle` | `ViewStyle` |  | Styling applied directly to the Animated View containing the SVG wheel. |  
| `titleStyle` | [`WheelTextStyleProps`](https://github.com/senthalan2/react-native-advanced-spin-wheel/blob/main/README.md#wheeltextstyleprops) |  | Global typography styles applied to all section titles. |  
| `descriptionStyle` | [`WheelTextStyleProps`](https://github.com/senthalan2/react-native-advanced-spin-wheel/blob/main/README.md#wheeltextstyleprops) |  | Global typography styles applied to all section descriptions. |
---

### SpinWheelKnobProps 🎯  
  
| Prop | Type | Default | Description |  
|------|------|---------|-------------|  
| `size` | `number` | 80 | Diameter of the knob in pixels. |  
| `backgroundColor` | `string` | `#FFFFFF` | Solid background color of the knob. |  
| `borderColor` | `string` | `#E0E0E0` | Border color of the knob. |  
| `borderWidth` | `number` | 4 | Border width of the knob. |  
| `text` | `string` | `'SPIN'` | Text displayed inside the knob. |  
| `textStyle` | `TextStyle` |  | Additional React Native Text styles applied to the knob text. |  
| `renderContent` | `() => ReactNode` |  | Custom function to render complex content inside the knob. Overrides `text`. |  
| `shadow` | `boolean` | true | Show a drop shadow behind the knob. |  
| `disabled` | `boolean` | false | Disable press interactions on the knob. |  
| `loading` | `boolean` | false | Show a loading indicator inside the knob. |  
| `gradientColors` | `string[]` |  | Array of colors to create a linear gradient for the knob background. Overrides `backgroundColor`. |  
| `onPress` | `() => void` |  | Callback fired when the knob is pressed. |  
| `style` | `ViewStyle` |  | Additional React Native View styles for the knob container. |  
---

### SpinWheelSectionProps 🎡  
  
| Prop | Type | Description |  
|------|------|-------------|  
| `id` | `string` | **Unique identifier** for the slice. Required. |  
| `title` | `string` | Main text displayed prominently on the slice. |  
| `description` | `string` | Optional secondary text displayed closer to the center of the wheel. |  
| `backgroundColor` | `string` | Background color of the slice (Hex, RGB, or RGBA). |  
| `textColor` | `string` | Optional text color for this slice. Overrides global styles if provided. |  
| `image` | `ImageSourcePropType` | Optional image rendered at the innermost radius of the slice. |  
  
---

### WheelTextStyleProps  
  
| Prop | Type | Description |  
|------|------|-------------|  
| `fontSize` | `number` | The size of the font. Optional. |  
| `fontFamily` | `string` | The font family to use (e.g., `'Arial'`, `'Roboto'`). Optional. |  
| `fontWeight` | `'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'` | The thickness of the text. Optional. |  
| `fontStyle` | `'normal' \| 'italic'` | The style of the font. Optional. |  
| `color` | `string` | Text color in hex, RGB, or named color. Overrides `textColor` in `SpinWheelSectionProps`. Optional. |  
| `letterSpacing` | `number` | The spacing between letters. Optional. |

---

### 🔧 Methods via `ref`

```bash
const  wheelRef  =  useRef<SpinWheelRefProps>(null);
```
-   `spin()` — Spins randomly or to `winningIndex`
    
-   `spinToIndex(index: number)` — Spins to a specific index
    
-   `reset()` — Resets wheel to initial rotation
    

----------

### 🎨 Custom Knob Example

```bash
<SpinWheel  
  ref={wheelRef}  
  sections={sections}  
  renderKnob={(props) => <CustomKnob {...props} text="GO!"  />}  
/>
```
----------


## 📄 License

MIT 
