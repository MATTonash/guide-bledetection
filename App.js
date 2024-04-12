import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home";
import BeaconDetails from "./screens/beaconDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Beacons" component={HomeScreen} />
        <Stack.Screen name="BeaconDetails" component={BeaconDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
