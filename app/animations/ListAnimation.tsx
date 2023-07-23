import React from "react";
import { FlatList, StyleSheet, Text, View, ViewToken } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface IListAnimation {}

const data = Array.from({ length: 50 }).map((_, i) => ({ id: i + 1 }));

function ListAnimation({}: IListAnimation) {
  const renderedItems = useSharedValue<ViewToken[]>([]);

  return (
    <FlatList
      data={data}
      renderItem={({ index, item }) => (
        <ListItem index={index} item={item} renderedItems={renderedItems} />
      )}
      contentContainerStyle={{ paddingBottom: 45 }}
      onViewableItemsChanged={(info) => {
        console.log("info", info);
        renderedItems.value = info.viewableItems;
      }}
      style={styles.container}
    ></FlatList>
  );
}

type TListItem = {
  index: number;
  item: {
    id: number;
  };
  renderedItems: Animated.SharedValue<ViewToken[]>;
};

function ListItem({ index, item, renderedItems }: TListItem) {
  const style = useAnimatedStyle(() => {
    const isVisible = renderedItems.value.filter(
      ({ item: _item, isViewable }) => {
        return _item.id === item.id && isViewable;
      }
    ).length;

    console.log(`isVisible ${index}`, isVisible);

    return {
      transform: [{ scale: withTiming(isVisible ? 1 : 0.5) }],
    };
  });

  return (
    <Animated.View style={[styles.listItem, style]}>
      <Text>{item.id}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000050",
  },
  listItem: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 80,
    borderRadius: 20,
    width: "90%",
    marginVertical: 8,
    backgroundColor: "#ffffff50",
  },
});

export default ListAnimation;
