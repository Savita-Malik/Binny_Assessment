import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductList from "../screens/ProductList";
import CartScreen from "../screens/CartScreen";
import UserListScreen from "../screens/UserListScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

// Create the Tab navigator
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Products") iconName = "bag-outline";
          else if (route.name === "Cart") iconName = "cart-sharp";
          else if (route.name === "Users") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Products" component={ProductList} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Users" component={UserListScreen} />
    </Tab.Navigator>
  );
}
