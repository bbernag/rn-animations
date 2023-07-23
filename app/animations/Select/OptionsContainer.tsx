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
}

function OptionsContainer({
  open,
  children,
  optionsHeight,
  tooltipPosition,
  backgroundColor,
  optionsContainerStyle,
}: IOptionsContainer) {
  const animation = useDerivedValue(() => {
    return open ? withTiming(1) : withTiming(0);
  });

  console.log("tooltipPosition", tooltipPosition);
  const rStyle = useAnimatedStyle(() => {
    const height = interpolate(animation.value, [0, 1], [0, optionsHeight]);
    const interpolatePositionValue =
      tooltipPosition === "bottom" ? 45 : -optionsHeight;

    const top = interpolate(
      animation.value,
      [0, 1],
      [40, interpolatePositionValue]
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
    position: "absolute",
    width: "100%",
  },
});

export default OptionsContainer;
