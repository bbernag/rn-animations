import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface IOptionsContainer {
  children: React.ReactNode;
  color: string;
  open: boolean;
  optionsHeight: number;
  tooltipPosition: Animated.SharedValue<"top" | "bottom">;
  backgroundColor: string;
  optionsContainerStyle: any;
  optionsPlaceholder?: string;
  pageY: number;
}

function OptionsContainer({
  open,
  children,
  optionsHeight,
  tooltipPosition,
  backgroundColor,
  optionsContainerStyle,
  pageY,
}: IOptionsContainer) {
  const animation = useDerivedValue(() => {
    return open
      ? withTiming(1, { duration: 200 })
      : withTiming(0, { duration: 200 });
    // ? withSpring(1, { damping: 12 })
    // : withSpring(0, { damping: 12 });
  });

  const rStyle = useAnimatedStyle(() => {
    const height = interpolate(animation.value, [0, 1], [0, optionsHeight]);
    // const height = animation.value ? optionsHeight : 0;

    const bottomTranslateRanges = [pageY - 35, pageY - 16];
    const topTranslateRanges = [pageY - 30, pageY - optionsHeight - 61];

    const translationRanges =
      tooltipPosition.value === "bottom"
        ? bottomTranslateRanges
        : topTranslateRanges;

    const translateY = interpolate(animation.value, [0, 1], translationRanges);

    return {
      height,
      display: "flex",
      opacity: animation.value,
      transform: [{ translateY }],
    };
  });

  const borderStyles =
    tooltipPosition.value === "bottom"
      ? {
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }
      : {
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        };

  return (
    <Animated.ScrollView
      style={[
        { backgroundColor },
        styles.optionsContainer,
        borderStyles,
        optionsContainerStyle,
        rStyle,
      ]}
    >
      {children}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    height: 0,
    zIndex: 2,
    position: "absolute",
    width: "100%",
  },
});

export default OptionsContainer;
