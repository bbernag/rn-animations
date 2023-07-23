import React from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const colors = {
  0: "orange",
  1: "red",
  "-1": "green",
};

function Card({
  index,
  isToggled,
  transition,
}: {
  index: number;
  isToggled: boolean;
  transition: Animated.SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => {
    // console.log("transition.value", transition.value);
    const rotate = transition.value * index * 20;
    const translateY = transition.value * index * 56;

    // console.log("rotate", rotate);

    return {
      transform: [{ rotate: `${rotate}deg` }, { translateY }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          zIndex: index,
          height: 200,
          width: width - 40,
          backgroundColor: colors[index],
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 16,
        },
        style,
      ]}
    >
      <Text style={{ fontSize: 18, color: "white" }}>Card</Text>
    </Animated.View>
  );
}

function Transitions() {
  const [isToggled, setIsToggled] = React.useState(false);
  const sharedToggled = useSharedValue(false);

  React.useEffect(() => {
    sharedToggled.value = isToggled;
  }, [isToggled]);

  console.log("starting transition");
  const transition = useDerivedValue(() => {
    return withSpring(sharedToggled.value);
  });

  return (
    <>
      <Text
        style={{ marginTop: 30, fontSize: 22, color: "white" }}
        onPress={() => {
          setIsToggled(!isToggled);
        }}
      >
        Toggle
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "blue",
          paddingLeft: 16,
          position: "relative",
        }}
      >
        <Card index={-1} isToggled={isToggled} transition={transition} />
        <Card index={0} isToggled={isToggled} transition={transition} />
        <Card index={1} isToggled={isToggled} transition={transition} />
      </View>
    </>
  );
}

export default Transitions;
