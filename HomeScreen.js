// C:\Users\Mikaela\Mobile App Development\FetchLocalhostWeek7\FetchLocalhostWeek7\HomeScreen.js

import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome,</Text>
      <Text>
        This is a Restaurant App where you can create, read, update and delete
        your dishes.
      </Text>
      <Button
        title="Manage Products"
        onPress={() => navigation.navigate("ManageProducts")}
      />
      <Button
        title="All Products"
        onPress={() => navigation.navigate("AllProducts")}
      />
    </View>
  );
};

export default HomeScreen;
