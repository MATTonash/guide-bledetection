/**
 * Imports NavigationContainer, createAppContainer from @react-navigation/native
 * Imports createNativeStackNavigator from @react-navigation/native-stack
 * Imports Home screen component
 *
 * Creates an object with Home screen config
 * Creates a StackNavigator using createNativeStackNavigator with the screens object
 * Exports the navigator wrapped in createAppContainer
 */

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
