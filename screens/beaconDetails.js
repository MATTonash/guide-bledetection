/**
 * BeaconDetails component displays the details of a beacon.
 *
 * @param {object} route - The route object passed from the navigation prop.
 * @param {object} navigation - The navigation prop to navigate between screens.
 *
 * It receives the beacon details as route params:
 * - id - The id of the beacon.
 * - title - The title of the beacon.
 * - major - The major id of the beacon.
 * - minor - The minor id of the beacon.
 * - distance - The distance to the beacon.
 * - rssi - The received signal strength indicator.
 *
 * It displays the title and details in a View.
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function BeaconDetails({ route, navigation }) {
  const { id, title, major, minor, distance, rssi } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <Text style={styles.sub_text}>Major: {major}</Text>
        <Text style={styles.sub_text}>Minor: {minor}</Text>
        <Text style={styles.sub_text}>RSSI: {rssi}</Text>
        <Text style={styles.sub_text}>Distance: {distance}m</Text>
      </View>
    </SafeAreaView>
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
