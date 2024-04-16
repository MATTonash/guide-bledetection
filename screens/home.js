/**
 * HomeScreen component
 *
 * Displays a list of beacons and allows navigating to a
 * details screen for each beacon
 */

import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import CardView from "../components/cardView";
import useBLE from "../useBLE";
import { SafeAreaView } from "react-native-safe-area-context";
import DeviceModal from "../components/DeviceConnectionModal";

/**
 * HomeScreen component
 * @param {object} navigation - React navigation prop for navigating between screens
 */
const HomeScreen = ({ navigation }) => {
  /**
   * beaconData state
   * Array of beacon objects with id, title, major, minor, distance and rssi
   */
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

  // Manage the bluetooth connections
  const {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    distance,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState(false);

  /**
   * pressHandler
   * Handles onPress event from CardView
   * @param {number} key - id of pressed CardView
   */
  const pressHandler = (key) => {
    // This should navigate to a new page
    const item = beaconData.find((data) => data.id === key);
    // console.log(`Pressed ${key} - ${item.title}`);
    navigation.navigate("BeaconDetails", { ...item });
  };

  const scanForDevices = () => {
    requestPermissions((isGranted) => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <>
            <PulseIndicator />
            <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
            <Text style={styles.heartRateText}>{heartRate} bpm</Text>
          </>
        ) : (
          <Text style={styles.heartRateTitleText}>
            Please Search for devices
            {console.log("hello")}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView>
  );

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <View style={styles.heartRateTitleWrapper}>
  //       <Text style={{ fontSize: 50, color: "black" }}>Meters</Text>
  //       <Text style={{ fontSize: 300, color: "black" }}>{distance}</Text>
  //     </View>
  //     <TouchableOpacity onPress={scanForDevices} style={styles.ctaButton}>
  //       <Text style={styles.ctaButtonText}>FIND THE DISTANCE</Text>
  //     </TouchableOpacity>
  //   </SafeAreaView>
  // );

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <Text style={styles.title}>Beacons</Text>
  //     {/* FlatList with data from state*/}
  //     <FlatList
  //       data={beaconData}
  //       renderItem={({ item }) => (
  //         <CardView
  //           title={item.title}
  //           major={item.major}
  //           minor={item.minor}
  //           distance={item.distance}
  //           rssi={item.rssi}
  //           pressHandler={() => pressHandler(item.id)}
  //         />
  //       )}
  //       keyExtractor={(item) => item.id}
  //     />
  //     {/* Todo: Change ble stuff*/}
  //     <View style={styles.heartRateTitleWrapper}>
  //       <Text style={{ fontSize: 50, color: "black" }}>Meters</Text>
  //       <Text style={{ fontSize: 300, color: "black" }}>{distance}</Text>
  //     </View>
  //     <TouchableOpacity onPress={scanForDevices} style={styles.ctaButton}>
  //       <Text style={styles.ctaButtonText}>FIND THE DISTANCE</Text>
  //     </TouchableOpacity>
  //   </SafeAreaView>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
  },
  container2: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
