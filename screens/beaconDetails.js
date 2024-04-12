import React from "react";
import { StyleSheet, Text, View } from "react-native";

function BeaconDetails({ route, navigation }) {
  const { id, title, major, minor, distance, rssi } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <Text style={styles.sub_text}>Major: {major}</Text>
        <Text style={styles.sub_text}>Minor: {minor}</Text>
        <Text style={styles.sub_text}>RSSI: {rssi}</Text>
        <Text style={styles.sub_text}>Distance: {distance}m</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
    marginBottom: 20,
  },
  sub_text: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default BeaconDetails;
