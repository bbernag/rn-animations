import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TOption } from "./Select";

export type OptionProps = {
  option: TOption;
  color: string;
  isActive: boolean;
  optionStyle?: any;
  handleSelectedOption: (option: { name: string; value: string }) => void;
};

function Option({
  option,
  color,
  isActive,
  optionStyle,
  handleSelectedOption,
}: OptionProps) {
  return (
    <TouchableOpacity
      key={option.value}
      style={styles.select_option__no_selected}
      onPress={() => handleSelectedOption(option)}
    >
      <Text
        style={[
          styles.select_option__no_selected_label,
          {
            fontWeight: isActive ? "bold" : "normal",
          },
          { color },
          optionStyle,
        ]}
      >
        {option.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  select_option__no_selected_label: {
    color: "#fff",
  },
  select_option__no_selected: {
    padding: 8,
    height: 40,
  },
});

export default Option;
