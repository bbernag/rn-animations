import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";

interface IEnteringExiting {}

const AnimatedView = Animated.createAnimatedComponent(View);

const Right = ({ children, ...rest }) => (
  <Animated.View {...rest} entering={SlideInRight} exiting={SlideOutLeft}>
    {children}
  </Animated.View>
);

const Left = ({ children, ...rest }) => (
  <Animated.View {...rest} entering={SlideInLeft} exiting={SlideOutRight}>
    {children}
  </Animated.View>
);

function EnteringExiting({}: IEnteringExiting) {
  const [state, setState] = React.useState(false);
  const [direction, setDirection] = React.useState<"left" | "right">("left");

  //   const direction = useDerivedValue(() => {
  //     return state ? "left" : "right";
  //   });

  //   const direction = useSharedValue("right");

  //   const animationProps = useAnimatedProps(() => {
  //     return {
  //       entering: direction.value === "left" ? SlideInRight : SlideOutLeft,
  //       exiting: direction.value === "left" ? SlideOutLeft : SlideInRight,
  //     };
  //   });

  //   const exiting = () => {
  //     return direction.value === "left" ? SlideOutLeft : SlideInRight;
  //   };

  //   const Component = direction === "left" ? Left : Right;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <TouchableOpacity onPress={() => setState((_state) => !state)}>
        <Text style={{ color: "white", marginBottom: 30 }}>Toggle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          //   direction.value = direction.value === "left" ? "right" : "left";
          setDirection((_direction) =>
            _direction === "left" ? "right" : "left"
          );
        }}
      >
        <Text style={{ color: "white" }}>Toggle direction {direction}</Text>
      </TouchableOpacity>
      {/* {state ? ( */}
      <C direction={direction} />
      {/* ) : null} */}
    </View>
  );
}

const C = ({ direction }: { direction: "left" | "right" }) => (
  <Animated.View
    style={{ height: 200, width: 200, backgroundColor: "red" }}
    entering={direction === "left" ? SlideInRight : SlideInLeft}
    exiting={direction === "left" ? SlideOutLeft : SlideOutRight}
  >
    <Text>{direction}</Text>
  </Animated.View>
);

export default EnteringExiting;
