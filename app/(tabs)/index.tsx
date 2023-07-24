import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Link href="/animations/Pan" asChild>
        <Text style={{ marginTop: 16 }}>Pan</Text>
      </Link>
      <Link href="/animations/Transitions" asChild>
        <Text style={{ marginTop: 16 }}>Transitions</Text>
      </Link>
      <Link href="/animations/HighOrderAnimations" asChild>
        <Text style={{ marginTop: 16 }}>HighOrderAnimations</Text>
      </Link>
      <Link href="/animations/OrderCreated" asChild>
        <Text style={{ marginTop: 16 }}>Order Created</Text>
      </Link>
      <Link href="/animations/ColorPicker/ColorPicker" asChild>
        <Text style={{ marginTop: 16 }}>Color Picker</Text>
      </Link>
      <Link href="/animations/ListAnimation" asChild>
        <Text style={{ marginTop: 16 }}>List Animation</Text>
      </Link>
      <Link href="/animations/Select/SelectSample" asChild>
        <Text style={{ marginTop: 16 }}>Multiple Select</Text>
      </Link>
      <Link href="/animations/Select/Select" asChild>
        <Text style={{ marginTop: 16 }}>Select</Text>
      </Link>
      <Link href="/animations/EnteringExiting" asChild>
        <Text style={{ marginTop: 16 }}>EnteringExiting</Text>
      </Link>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
