import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, ScanMode } from "react-native-ble-plx";

const bleManager = new BleManager();

const distanceBuffer = [-1, -1, -1];
let numOfSamples = 0;

function useBLE() {
  const [distance, setDistance] = useState(-1);
  const [allDevices, setAllDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(
      null,
      {
        allowDuplicates: true,
        scanMode: ScanMode.LowLatency,
      },
      (error, device) => {
        if (error) {
          console.log(error);
        }
        console.log(device);
        if (device) {
          setAllDevices((prevState) => {
            if (!isDuplicteDevice(prevState, device)) {
              return [...prevState, device];
            }
            return prevState;
          });

          const currentDistance = Math.pow(10, (-75 - device.rssi) / (10 * 3));

          distanceBuffer[numOfSamples % 3] = currentDistance;

          if (distanceBuffer.includes(-1)) {
            setDistance(-1);
          } else {
            const sum = distanceBuffer.reduce((a, b) => a + b);
            setDistance(Math.round(sum / distanceBuffer.length));
          }

          numOfSamples++;
        }
      }
    );

  // const scanForPeripherals = () =>
  //   bleManager.startDeviceScan(
  //     null,
  //     {
  //       allowDuplicates: true,
  //       scanMode: ScanMode.LowLatency,
  //     },
  //     (error, device) => {
  //       // Todo: Change to work for all devices
  //       console.log(device);
  //       if (device?.name?.includes("ARO")) {
  //         // Todo: Performing math to figure out the distance
  //         const currentDistance = Math.pow(10, (-75 - device.rssi) / (10 * 3));

  //         distanceBuffer[numOfSamples % 3] = currentDistance;

  //         if (distanceBuffer.includes(-1)) {
  //           setDistance(-1);
  //         } else {
  //           const sum = distanceBuffer.reduce((a, b) => a + b);
  //           setDistance(Math.round(sum / distanceBuffer.length));
  //         }

  //         numOfSamples++;
  //       }
  //     }
  //   );

  const connectToDevice = async (device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setHeartRate(0);
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    distance,
  };
}

export default useBLE;
