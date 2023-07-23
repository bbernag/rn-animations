import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

interface IOptionsContainer {
  children: React.ReactNode;
  color: string;
  open: boolean;
  optionsHeight: number;
  tooltipPosition: "top" | "bottom";
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
      ? withTiming(1, { duration: 150 })
      : withTiming(0, { duration: 150 });
  });

  const rStyle = useAnimatedStyle(() => {
    const height = interpolate(animation.value, [0, 1], [0, optionsHeight]);
    const interpolatePositionValue =
      (tooltipPosition === "bottom" ? 45 : -optionsHeight) + pageY;

    const top = interpolate(
      animation.value,
      [0, 1],
      [pageY + 20, interpolatePositionValue]
    );

    return {
      top,
      height,
      display: "flex",
      opacity: animation.value,
    };
  });

  const borderStyles =
    tooltipPosition === "bottom"
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
