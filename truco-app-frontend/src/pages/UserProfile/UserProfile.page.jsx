import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { UserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router";
import axios from "axios";
import styles from "./UserProfile.styles";
import { ActivityIndicator } from "react-native";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");

  const handleNavigateOverview = () => {
    navigate("../overview");
  };

  const handleNavigateEditUser = () => {
    navigate("../editUser");
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
    if (!user.id) {
      navigate("../login");
    } else {
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
          <ActivityIndicator size="large" color="#0000ff" />
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

export default UserProfile;
