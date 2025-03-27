import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import styles from "../styles";
import config from "../config";

const AllProductsScreen = () => {
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={styles.headerText}>All Products</Text>
      <Text style={styles.descriptionText}>
        Here you can view all the products available in the inventory.
      </Text>
      <TouchableOpacity style={buttonStyles.button} onPress={fetchProducts}>
        <Text style={buttonStyles.buttonText}>Get All Products</Text>
      </TouchableOpacity>
      {products.map((product, index) => (
        <View key={product.ourId + index} style={styles.productContainer}>
          <Text style={styles.productText}>
            {"Product ID: " + product.ourId}
          </Text>
          <Text style={styles.productText}>{"Name: " + product.name}</Text>
          <Text style={styles.productText}>
            {"Category: " + product.category}
          </Text>
          <Text style={styles.productText}>{"Brand: " + product.brand}</Text>
          <Text style={styles.productText}>
            {"Description: " + product.description}
          </Text>
          <Text style={styles.productText}>{"Color: " + product.color}</Text>
          <Text style={styles.productText}>{"Weight: " + product.weight}</Text>
          <Text style={styles.productText}>
            {"Availability: " + product.availability}
          </Text>
          <Text style={styles.productText}>
            {"Product Price: " + product.price}
          </Text>
        </View>
      ))}
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AllProductsScreen;
