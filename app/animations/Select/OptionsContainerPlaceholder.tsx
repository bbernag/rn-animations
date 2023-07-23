import React from "react";
import { Text, View } from "react-native";

interface IOptionsContainerPlaceholder {
  color: string;
  optionsHeight: number;
  optionsPlaceholder?: string;
}

function OptionsContainerPlaceholder({
  color,
  optionsHeight,
  optionsPlaceholder,
}: IOptionsContainerPlaceholder) {
  return (
    <View
      style={{
        flex: 1,
        height: optionsHeight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color }}>{optionsPlaceholder || "No options"}</Text>
    </View>
  );
}

export default OptionsContainerPlaceholder;
