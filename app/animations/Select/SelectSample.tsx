import React from "react";
import { Text, View } from "react-native";
import Select from "./Select";

interface ISelectSample {}

function SelectSample({}: ISelectSample) {
  return (
    <View style={{ flex: 1 }}>
      <Select zIndex={8}></Select>
      <Select zIndex={7}></Select>
      <Select zIndex={6}></Select>
      <Select zIndex={5}></Select>
      <Select zIndex={4}></Select>
      <Select zIndex={3}></Select>
      <Select zIndex={2}></Select>
      <Select zIndex={1}></Select>
    </View>
  );
}

export default SelectSample;
