import React from "react";
import { ScrollView } from "react-native";
import Select from "./Select";

interface ISelectSample {}

function SelectSample({}: ISelectSample) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Select name="select_1" zIndex={8}></Select>
      <Select name="select_2" zIndex={8}></Select>
      <Select name="select_3" zIndex={8}></Select>
      <Select name="select_4" zIndex={8}></Select>
      <Select
        name="select_5"
        optionsHeight={500}
        defaultValue={{ name: "Hola", value: "" }}
        zIndex={8}
      ></Select>
      <Select name="select_6" zIndex={8}></Select>
      <Select name="select_7" zIndex={8}></Select>
      <Select name="select_8" zIndex={8}></Select>
      <Select name="select_8" zIndex={8}></Select>
      <Select name="select_9" zIndex={8}></Select>
      <Select name="select_10" zIndex={8}></Select>
      <Select name="select_11" zIndex={8}></Select>
      <Select name="select_12" zIndex={8}></Select>
      <Select name="select_13" zIndex={8}></Select>
      <Select name="select_14" zIndex={8}></Select>
      <Select name="select_15" zIndex={8}></Select>
    </ScrollView>
  );
}

export default SelectSample;
