import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import styles from "./UserProfile.styles";
import { ActivityIndicator } from "react-native";
import userContext from "../../context/userContext";

export const UserProfile = ({ navigation }) => {
  const { user } = useContext(userContext);
  const [avatar, setAvatar] = useState("");
  const color = Platform.OS === "android" ? "#2196F3" : "#007AFF";

  const handleNavigateOverview = () => {
    navigation.navigate("overview");
  };

  const handleNavigateEditUser = () => {
    navigation.navigate("editUser");
  };

  const fetchAvatar = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const avatarUrl = response.data.results[0].picture.large;
      setAvatar(avatarUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchAvatar();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Perfil de Usuario</Text>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <ActivityIndicator size="large" color={color} />
        )}
        <Text style={styles.label}>Username: {user.username}</Text>
        <Text style={styles.label}>Email: {user.email}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateOverview}
        >
          <Text style={styles.buttonText}>Notas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNavigateEditUser}>
          <Text style={styles.textSecondary}>Configuraciones avanzadas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
