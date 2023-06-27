import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { UserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router";
import styles from "./UserProfile.styles";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigateOverview = () => {
    navigate("../overview");
  };

  const handleNavigateEditUser = () => {
    navigate("../editUser");
  };

  useEffect(() => {
    if (!user.id) {
      navigate("../login");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Perfil de Usuario</Text>
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
