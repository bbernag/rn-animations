import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface IPicker {
  pickerHeight: number;
  pickerWidth: number;
  maxWidth: number;
}

const colors = [
  "red",
  "rebeccapurple",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];

function Picker({ pickerHeight, pickerWidth, maxWidth }: IPicker) {
  const translateX = useSharedValue(0);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, -155), 155);
  });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (event, context) => {
      context.x = adjustedTranslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = withSpring(event.translationX + context.x);
    },
    onEnd: (event, context) => {
      //   ctx.x = translateX.value;
    },
  });

  const preColorsInput = Array.from(
    { length: 5 },
    (_, i) => ((i + 1) / -colors.length) * 195 - pickerWidth
  ).reverse();

  const postColorsInput = Array.from(
    { length: 5 },
    (_, i) => ((i + 1) / colors.length) * 195 + pickerWidth
  );

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: adjustedTranslateX.value }],
    };
  });

  const colorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      adjustedTranslateX.value,
      [...preColorsInput, ...postColorsInput],
      colors
    );
    return {
      backgroundColor,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={{ alignItems: "center" }}>
        <LinearGradient
          style={[
            styles.picker,
            {
              width: maxWidth,
              height: pickerHeight,
              borderRadius: pickerHeight,
            },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors}
        ></LinearGradient>
        <Animated.View
          style={[
            styles.pickerCircle,
            {
              height: pickerHeight,
              width: pickerWidth,
              borderRadius: pickerHeight,
            },
            style,
          ]}
        >
          <Animated.View
            style={[styles.miniPicker, colorStyle]}
          ></Animated.View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  picker: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "white",
  },
  pickerCircle: {
    position: "absolute",
    zIndex: 5,
    backgroundColor: "#ffffff50",
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  miniPicker: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
  },
});

export default Picker;
