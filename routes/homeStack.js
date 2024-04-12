import {
  NavigationContainer,
  createAppContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";

const screens = {
  Home: {
    screen: Home,
  },
};

const HomeStack = createNativeStackNavigator(screens);

export default createAppContainer(HomeStack);
