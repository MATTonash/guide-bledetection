import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import CardView from "./components/cardView";

export default function App() {
  const [beaconData, setBeaconData] = useState([
    {
      id: 1,
      title: "RF-STAR",
      major: 123,
      minor: 456,
      distance: 10,
      rssi: -60,
    },
    {
      id: 2,
      title: "BeeLink",
      major: 789,
      minor: 101,
      distance: 15,
      rssi: -75,
    },
    {
      id: 3,
      title: "MokoSmart",
      major: 112,
      minor: 131,
      distance: 20,
      rssi: -90,
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beacons</Text>
      {/* FlatList with data from state*/}
      <FlatList
        data={beaconData}
        renderItem={({ item }) => (
          <CardView
            title={item.title}
            major={item.major}
            minor={item.minor}
            distance={item.distance}
            rssi={item.rssi}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
  },
});
