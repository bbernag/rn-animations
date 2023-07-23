import React from "react";
import { Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { withPause } from "react-native-redash";

interface IHighOrderAnimations {}

function Circle() {
  return (
    <View
      style={{
        height: 150,
        width: 150,
        borderRadius: 150,
        backgroundColor: "lightgray",
      }}
    ></View>
  );
}

function Triangle() {
  return (
    <View
      style={{
        height: 78,
        width: 78,
        backgroundColor: "lightgray",
        position: "absolute",
        bottom: 0,
        right: 0,
      }}
    ></View>
  );
}

function Dot({
  progress,
  start,
  end,
}: {
  index: number;
  progress: any;
  start: number;
  end: number;
}) {
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [start, end],
      [1, 1.2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      progress.value,
      [start, end],
      [0.5, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 20,
          width: 20,
          backgroundColor: "#00000050",
          borderRadius: 20,
          margin: 8,
        },
        style,
      ]}
    ></Animated.View>
  );
}

function HighOrderAnimations({}: IHighOrderAnimations) {
  const progress = useSharedValue(false);
  const [paused, setPaused] = React.useState(false);
  const sharedPaused = useSharedValue(false);

  React.useEffect(() => {
    sharedPaused.value = paused;
  }, [paused]);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          onPress={() => {
            setPaused((_paused) => !_paused);
            progress.value = withPause(
              withRepeat(withTiming(1, { duration: 1000 }), -1, true),
              sharedPaused.value
            );
          }}
          style={{ fontSize: 28, color: "white", marginBottom: 16 }}
        >
          Start animation
        </Text>
        <View
          style={{
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              zIndex: 2,
              top: 55,
              flexDirection: "row",
              left: 20,
            }}
          >
            <Dot progress={progress} index={1} start={0} end={0.33}></Dot>
            <Dot progress={progress} index={2} start={0.333} end={0.665}></Dot>
            <Dot progress={progress} index={3} start={0.665} end={1}></Dot>
          </View>
          <Circle />
          <Triangle />
        </View>
      </View>
    </>
  );
}

export default HighOrderAnimations;
