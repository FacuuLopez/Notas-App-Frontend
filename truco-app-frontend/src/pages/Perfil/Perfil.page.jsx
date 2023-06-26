import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigateOverview = () => {
    navigate('../overview')
  }

//   const handleNavigateEditInformation = () => {
//     console.log('editInfo')
//   }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Perfil de Usuario</Text>
        <Text style={styles.label}>Username: {user.username}</Text>
        <Text style={styles.label}>Email: {user.email}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNavigateOverview}>
          <Text style={styles.buttonText}>Notas</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={handleNavigateEditInformation}> 
          <Text style={styles.textSecondary}>Editar información</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  textSecondary: {
    marginTop: 5,
    fontSize: 18,
    color: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UserProfile;
