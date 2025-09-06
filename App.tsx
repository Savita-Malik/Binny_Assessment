import React from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import UserDetailsScreen from "./src/screens/UserDetailsScreen"; // make sure it's imported
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      MainTabs: {
        screens: {
          Products: "products",
          Cart: "cart",
          Users: "users",
        },
      },
      UserDetails: "user/:id",
    },
  },
};

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <NavigationContainer linking={linking} fallback={<></>}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={AppNavigator} />
          <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
