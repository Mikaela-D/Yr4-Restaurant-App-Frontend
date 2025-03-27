import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import styles from "../styles";
import config from "../config";

const ManageProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${config.ngrokUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setProducts(data.Products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: "Manage Products" });
    fetchProducts();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchProducts();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {products.map((product, index) => (
        <View key={product.ourId + index} style={styles.productContainer}>
          <Text style={styles.productText}>
            {"Product ID: " + product.ourId}
          </Text>
          <Text style={styles.productText}>{"Name: " + product.name}</Text>
          <Text style={styles.productText}>
            {"Product Price: " + product.price}
          </Text>
          <TouchableOpacity
            style={buttonStyles.smallButton}
            onPress={() => navigation.navigate("ProductDetails", { product })}
          >
            <Text style={buttonStyles.buttonText}>Details</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={buttonStyles.button}
        onPress={() => navigation.navigate("AddProduct")}
      >
        <Text style={buttonStyles.buttonText}>Add New Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#89387b",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  smallButton: {
    backgroundColor: "#89387b",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ManageProductsScreen;
