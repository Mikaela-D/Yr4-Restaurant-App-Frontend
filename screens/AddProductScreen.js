import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "../styles";
import config from "../config";
import * as Notifications from "expo-notifications";

const AddProductScreen = ({ navigation }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    description: "",
    color: "",
    weight: "",
    availability: "",
  });
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: "Add Product" });
    fetchProducts();
  }, []);

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

  const generateUniqueId = () => {
    const ids = products.map((p) => p.ourId);
    let newId = 1;
    while (ids.includes(newId.toString())) {
      newId++;
    }
    return newId.toString();
  };

  const handleChange = (name, value) => {
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    const {
      name,
      price,
      category,
      brand,
      description,
      color,
      weight,
      availability,
    } = product;
    if (
      !name ||
      !price ||
      !category ||
      !brand ||
      !description ||
      !color ||
      !weight ||
      !availability
    ) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    const newProduct = { ...product, ourId: generateUniqueId() };
    try {
      const res = await fetch(`${config.ngrokUrl}/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (data.success) {
        console.log("Product added successfully, scheduling notification...");
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Product Added",
            body: `Product ${newProduct.name} has been added successfully.`,
            data: { userName: "Max" },
          },
          trigger: { seconds: 1 },
        });
        console.log("Notification scheduled for product addition");
        navigation.navigate("ManageProducts", { refresh: true });
      } else {
        console.log("Failed to add product:", data.theError);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add New Product</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        placeholder="Name"
        value={product.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        placeholder="Price"
        value={product.price}
        onChangeText={(value) => handleChange("price", value)}
      />
      <TextInput
        placeholder="Category"
        value={product.category}
        onChangeText={(value) => handleChange("category", value)}
      />
      <TextInput
        placeholder="Brand"
        value={product.brand}
        onChangeText={(value) => handleChange("brand", value)}
      />
      <TextInput
        placeholder="Description"
        value={product.description}
        onChangeText={(value) => handleChange("description", value)}
      />
      <TextInput
        placeholder="Color"
        value={product.color}
        onChangeText={(value) => handleChange("color", value)}
      />
      <TextInput
        placeholder="Weight"
        value={product.weight}
        onChangeText={(value) => handleChange("weight", value)}
      />
      <TextInput
        placeholder="Availability"
        value={product.availability}
        onChangeText={(value) => handleChange("availability", value)}
      />
      <TouchableOpacity style={buttonStyles.button} onPress={handleSubmit}>
        <Text style={buttonStyles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
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

export default AddProductScreen;
