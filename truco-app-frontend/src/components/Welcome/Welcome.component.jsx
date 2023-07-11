import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const Welcome = () => {
  const color = Platform.OS === "android" ? "#2196F3" : "#007AFF";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default Welcome;
