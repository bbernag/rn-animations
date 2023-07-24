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
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Option from "./Option";
import OptionsContainer from "./OptionsContainer";
import OptionsContainerPlaceholder from "./OptionsContainerPlaceholder";
import { useSelectContext } from "./SelectContext";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

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
  name: string;
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

const SAFE_AREA_VIEW_HEIGHT = 90;
const SCREEN_HEIGHT =
  Dimensions.get("window").height - SAFE_AREA_VIEW_HEIGHT - 200;

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
  name,
}: ISelect) {
  const { addSelect, removeSelect, currentSelect, setCurrentSelect } =
    useSelectContext();
  const [options, setOptions] = useState<TOption[]>(_options);
  const [selected, setSelected] = useState<TOption>(
    _selectedValue || defaultValue
  );
  const [open, setOpen] = useState(false);
  // const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom">(
  //   "bottom"
  // );

  React.useEffect(() => {
    setOptions(options);
  }, [options]);

  const handleOpen = () => {
    setOpen((_open) => {
      if (!_open) {
        setCurrentSelect(name);
      }

      return !_open;
    });
  };

  const handleSelectedOption = (option: TOption) => {
    onChange?.(option);
    setSelected(option);
    setOpen(false);
  };

  const currentValue = _selectedValue || selected;

  const containerStyleAnimation = useDerivedValue(() => {
    return open ? withTiming(1) : withTiming(0);
  });

  React.useEffect(() => {
    addSelect(name);

    return () => {
      removeSelect(name);
    };
  }, [name]);

  React.useEffect(() => {
    if (currentSelect !== name) {
      setOpen(false);
    }
  }, [currentSelect]);

  const aRef = useAnimatedRef<View>();
  const pageY = useSharedValue(0);
  const tooltipPosition = useSharedValue("bottom" as "bottom" | "top");

  const rContainerStyle = useAnimatedStyle(() => {
    const radius = interpolate(containerStyleAnimation.value, [1, 0], [0, 5]);
    const borderColor = interpolateColor(
      containerStyleAnimation.value,
      [0, 1],
      ["transparent", "#00000005"]
    );

    const containerStylePosition =
      tooltipPosition.value === "bottom"
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

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onEnd(event, context, isCanceledOrFailed) {
        const layout = measure(aRef);
        pageY.value = layout?.y + layout.height || 0;
        tooltipPosition.value =
          layout?.pageY > SCREEN_HEIGHT ? "top" : "bottom";
        runOnJS(handleOpen)();
      },
    });

  return (
    <>
      <View ref={aRef}>
        <TapGestureHandler onGestureEvent={tapGestureEvent}>
          <Animated.View
            style={[
              {
                backgroundColor,
                borderRadius: 5,
              },
              styles.select,
              rContainerStyle,
            ]}
            // onLayout={handleSelectLayout}
          >
            <TouchableHighlight
              activeOpacity={0.2}
              underlayColor={backgroundColor}
              // onPress={handleOpen}
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
          </Animated.View>
        </TapGestureHandler>
      </View>
      <OptionsContainer
        tooltipPosition={tooltipPosition}
        optionsPlaceholder={optionsPlaceholder}
        open={open}
        optionsContainerStyle={optionsContainerStyle}
        optionsHeight={optionsHeight}
        backgroundColor={backgroundColor}
        color={color}
        pageY={pageY.value}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff99",
  },
  select_container: {
    width: "50%",
  },
  select: {
    position: "relative",
    marginVertical: 16,
    justifyContent: "center",
    height: 45,
    flex: 1,
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
