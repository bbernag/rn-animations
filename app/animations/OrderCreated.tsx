import React from "react";
import { Dimensions, Text, View, useAnimatedValue } from "react-native";
import Animated, {
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function OrderCreated() {
  const [toggle, setToggle] = React.useState(false);

  const progress = useDerivedValue(() => {
    return withTiming(toggle ? 1 : 0, { duration: 400 });
  });

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{ color: "white", marginTop: 16, fontSize: 24 }}
        onPress={() => {
          setToggle((_toggle) => {
            return !_toggle;
          });
        }}
      >
        OrderCreated
      </Text>
      {toggle ? (
        <AnimatedModal
          progress={progress}
          closeModal={() => {
            setToggle(false);
          }}
        />
      ) : null}
    </View>
  );
}

function AnimatedModal({
  progress,
  closeModal,
}: {
  progress: Animated.DerivedValue<number>;
  closeModal: () => void;
}) {
  const styles = useAnimatedStyle(() => {
    const viewHeight = interpolate(
      progress.value,
      [0, 1],
      [0, height + 220],
      "clamp"
    );

    const viewWidth = interpolate(progress.value, [0, 1], [0, height], "clamp");

    return {
      width: viewWidth >= height ? width : viewWidth,
      height: viewHeight,
    };
  });

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Animated.View
        exiting={FadeOut.springify()}
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            height: 20,
            width: 20,
            position: "absolute",
            bottom: 0,
            borderTopRightRadius: height * 2,
            borderTopLeftRadius: height * 2,
            backgroundColor: "#ab2e4d50",
          },
          styles,
        ]}
      >
        <Text
          style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
          onPress={closeModal}
        >
          Close Modal
        </Text>
      </Animated.View>
    </View>
  );
}

export default OrderCreated;
