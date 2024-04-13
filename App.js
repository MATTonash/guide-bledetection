import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home";
import BeaconDetails from "./screens/beaconDetails";

/**
 * Creates stack navigator
 */
const Stack = createNativeStackNavigator();

/**
 * App component
 */
export default function App() {
  /**
   * Returns navigation container with stack navigator
   */
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Beacons" component={HomeScreen} />
        <Stack.Screen name="BeaconDetails" component={BeaconDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
