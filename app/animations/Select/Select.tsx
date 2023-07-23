import React, { useState } from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import Option from "./Option";
import OptionsContainer from "./OptionsContainer";
import OptionsContainerPlaceholder from "./OptionsContainerPlaceholder";

interface ISelect {
  color: string;
  options: TOption[];
  defaultValue: TOption;
  selectedValue?: TOption;
  optionsHeight?: number;
  backgroundColor?: string;
  onChange: (option: TOption) => void;
  optionsContainerStyle?: any;
  optionStyle?: any;
  selectedOptionStyle?: any;
  toggleOptions: () => void;
  optionsPlaceholder?: string;
}

const OPTIONS = [
  { name: "Inter Miami", value: "inter-miami" },
  { name: "Orlando City", value: "orlando-city" },
  { name: "Atlanta United", value: "atlanta-united" },
  { name: "Chicago Fire", value: "chicago-fire" },
  { name: "Columbus Crew", value: "columbus-crew" },
  { name: "D.C. United", value: "dc-united" },
  { name: "FC Cincinnati", value: "fc-cincinnati" },
];

export type TOption = {
  name: string;
  value: string;
};

// const SAFE_AREA_VIEW_HEIGHT = 120;

function Select({
  optionsHeight = 200,
  options: _options = OPTIONS,
  defaultValue = { name: "Escoge una opcion", value: "" },
  selectedValue: _selectedValue,
  onChange,
  backgroundColor = "white",
  color = "#00000090",
  optionsContainerStyle,
  optionStyle,
  selectedOptionStyle,
  optionsPlaceholder,
}: ISelect) {
  const [options, setOptions] = useState<TOption[]>(_options);
  const [selected, setSelected] = useState<TOption>(
    _selectedValue || defaultValue
  );
  const [open, setOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom">(
    "bottom"
  );

  React.useEffect(() => {
    setOptions(options);
  }, [options]);

  const handleOpen = () => {
    setOpen((_open) => !_open);
  };

  const handleSelectedOption = (option: TOption) => {
    onChange?.(option);
    setSelected(option);
    setOpen(false);
  };

  const currentValue = _selectedValue || selected;

  const handleSelectLayout = (event: LayoutChangeEvent) => {
    event.target?.measure((x, y, width, height, pageX, pageY) => {
      // console.log("x", x);
      // console.log("y", y);
      // console.log("width", width);
      // console.log("height", height);
      // console.log("pageX", pageX);
      // console.log("pageY", pageY);
      // const layout = event.nativeEvent.layout;
      const totalHeight = pageY + optionsHeight;
      // layout.height + layout.y + optionsHeight + SAFE_AREA_VIEW_HEIGHT;
      const screenHeight = Dimensions.get("screen").height;
      // console.log("layout", layout);
      // console.log("screenHeight", screenHeight);
      const position = totalHeight > screenHeight ? "top" : "bottom";
      setTooltipPosition(position);
    });
  };

  const containerStyleAnimation = useDerivedValue(() => {
    return open ? withTiming(1) : withTiming(0);
  });

  const rContainerStyle = useAnimatedStyle(() => {
    const radius = interpolate(containerStyleAnimation.value, [1, 0], [0, 5]);
    const borderColor = interpolateColor(
      containerStyleAnimation.value,
      [0, 1],
      ["transparent", "#00000005"]
    );

    const containerStylePosition =
      tooltipPosition === "bottom"
        ? {
            borderBottomLeftRadius: radius,
            borderBottomRightRadius: radius,
          }
        : {
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
          };

    return {
      ...containerStylePosition,
      borderBottomColor: borderColor,
      borderBottomWidth: 1,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.select_container}>
        <Animated.View
          style={[
            {
              backgroundColor,
              borderRadius: 5,
            },
            styles.select,
            rContainerStyle,
          ]}
          onLayout={handleSelectLayout}
        >
          <TouchableHighlight
            activeOpacity={0.2}
            underlayColor={backgroundColor}
            onPress={handleOpen}
            style={[styles.option_touchable, { backgroundColor }]}
          >
            <View style={styles.select_selected_option_container}>
              <Animated.Text
                style={[
                  styles.select_option__selected,
                  { color },
                  selectedOptionStyle,
                ]}
              >
                {currentValue?.name || "Select an option"}
              </Animated.Text>
            </View>
          </TouchableHighlight>
          <OptionsContainer
            tooltipPosition={tooltipPosition}
            optionsPlaceholder={optionsPlaceholder}
            open={open}
            optionsContainerStyle={optionsContainerStyle}
            optionsHeight={optionsHeight}
            backgroundColor={backgroundColor}
            color={color}
          >
            {open ? (
              options.length ? (
                options.map((option) => {
                  return (
                    <Option
                      color={color}
                      option={option}
                      key={option.value}
                      optionStyle={optionStyle}
                      handleSelectedOption={handleSelectedOption}
                      isActive={option.value === currentValue?.value}
                    />
                  );
                })
              ) : (
                <OptionsContainerPlaceholder
                  optionsPlaceholder={optionsPlaceholder}
                  color={color}
                  optionsHeight={optionsHeight}
                />
              )
            ) : null}
          </OptionsContainer>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff99",
    // justifyContent: "flex-end",
  },
  select_container: {
    width: "50%",
  },
  select: {
    position: "relative",
    margin: 8,
    justifyContent: "center",
    height: 45,
    width: "100%",
  },
  select_selected_option_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  option_touchable: {
    height: "100%",
    justifyContent: "center",
    borderRadius: 5,
  },
  select_option__selected: {
    paddingLeft: 8,
    color: "#fff",
  },
  select_option__no_selected_label: {
    color: "#fff",
  },
  select_option__no_selected: {
    padding: 8,
    height: 40,
  },
});

export default Select;
