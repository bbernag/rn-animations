import React from "react";
import { Dimensions, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";

interface IPan {}

type ContextType = {
  startX: number;
  startY: number;
};

const Card = () => <View style={{ width: 100, height: 100 }}></View>;

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function Pan({}: IPan) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx: ContextType) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: ContextType) => {
      translateX.value = clamp(ctx.startX + event.translationX, 0, width - 100);
      translateY.value = clamp(
        ctx.startY + event.translationY,
        0,
        height - 200
      );
    },
    onEnd: (event, ctx: ContextType) => {
      console.log("event.velocityY", event.velocityY);
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, width - 100],
      });
      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, height - 200],
      });
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      width: 100,
      height: 100,
      backgroundColor: "blue",
      opacity: translateX.value > width / 2 - 50 ? 0.2 : 0.9,
      zIndex: 2,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
          <Card />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export default Pan;
