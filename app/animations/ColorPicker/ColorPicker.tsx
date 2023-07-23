import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Picker from "./Picker";

interface IColorPicker {}

const { height, width } = Dimensions.get("window");
const MAX_WIDTH = width * 0.9;

function ColorPicker({}: IColorPicker) {
  return (
    <View style={styles.container}>
      <View style={styles.colorCircle}></View>
      <View style={styles.colorPicker}>
        <Picker
          pickerHeight={50}
          pickerWidth={50}
          maxWidth={MAX_WIDTH}
        ></Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  colorCircle: {
    flex: 3,
    backgroundColor: "white",
  },
  colorPicker: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default ColorPicker;
