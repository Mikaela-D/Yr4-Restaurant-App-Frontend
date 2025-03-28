// C:\Users\Mikaela\Mobile App Development\FetchLocalhostWeek7\FetchLocalhostWeek7\App.js

// import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles";
import HomeScreen from "./screens/HomeScreen";
import AllProductsScreen from "./screens/AllProductsScreen";
import ManageProductsScreen from "./screens/ManageProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import EditProductScreen from "./screens/EditProductScreen";
import ViewProductScreen from "./screens/ViewProductScreen";
import FetchScreen from "./screens/FetchScreen";
import AddProductScreen from "./screens/AddProductScreen";
import * as Notifications from "expo-notifications";

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

export default App = () => {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifications need the appropriate permissions."
        );
        return;
      }

      const subscription1 = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log("NOTIFICATION RECEIVED");
          console.log(notification);
          const userName = notification.request.content.data.userName;
          console.log(userName);
        }
      );

      const subscription2 =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("NOTIFICATION RESPONSE RECEIVED");
          console.log(JSON.stringify(response));
          const userName = response.notification.request.content.data.userName;
          console.log(userName);
        });

      return () => {
        subscription1.remove();
        subscription2.remove();
      };
    }

    configurePushNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Restaurant App" }}
        />
        <Stack.Screen name="Fetch" component={FetchScreen} />
        <Stack.Screen name="ViewProduct" component={ViewProductScreen} />
        <Stack.Screen name="ManageProducts" component={ManageProductsScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
        <Stack.Screen name="All Products" component={AllProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
