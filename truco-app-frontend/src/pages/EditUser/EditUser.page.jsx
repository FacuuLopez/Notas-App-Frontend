import React, { useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as FileSystem from "expo-file-system";
import { UserContext } from "../../context/UserProvider";
import styles from "./EditUser.styles";
import { useNavigate } from "react-router";

const EditUser = () => {
  const { user, setUser } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleNavigateOverview = () => {
    navigate("../overview");
  };

  const handleNavigateProfile = () => {
    navigate("../profile");
  };

  const confirmDeleteUser = async () => {
    try {
      const filePath = `${FileSystem.documentDirectory}users.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        let users = JSON.parse(fileContent);

        const newUsers = users.filter((u) => u.id !== user.id);

        if (newUsers.length < users.length) {
          const jsonString = JSON.stringify(newUsers);
          await FileSystem.writeAsStringAsync(filePath, jsonString);

          alert("Perfil eliminado exitosamente");

          navigate("../login");
        } else {
          alert("No es posible eliminar el usuario");
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    setUser({});
    navigate("../login");
  };

  const handleDeleteUser = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar tu usuario?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: confirmDeleteUser,
        },
      ]
    );
  };

  const onSubmit = async (data) => {
    try {
      const filePath = `${FileSystem.documentDirectory}users.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const users = JSON.parse(fileContent);

        const existingUser = users.find(
          (existingUser) =>
            (existingUser.email === data.email &&
              existingUser.email !== user.email) ||
            (existingUser.username === data.username &&
              existingUser.username !== user.username)
        );

        if (existingUser) {
          alert("El correo electronico o nombre de usuario ya existen");
          return;
        }

        const updatedUser = { ...user, ...data };

        const updatedUsers = users.map((existingUser) =>
          existingUser.id === updatedUser.id ? updatedUser : existingUser
        );

        const jsonString = JSON.stringify(updatedUsers);
        await FileSystem.writeAsStringAsync(filePath, jsonString);

        setUser(updatedUser);

        alert("Perfil actualizado exitosamente");

        handleNavigateProfile();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!user.id) {
      navigate("../login");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Editar perfil</Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="username"
          defaultValue={user.username}
          rules={{ required: "Nombre de usuario requerido", minLength: 5 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre de usuario</Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.username && (
                <Text style={styles.error}>{errors.username.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="email"
          defaultValue={user.email}
          rules={{
            required: "Correo electrónico requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo electrónico inválido",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          defaultValue={user.password}
          rules={{
            required: "Contraseña requerida",
            minLength: 5,
            pattern: /\d/,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNavigateOverview}>
            <Text style={styles.textSecondary}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={styles.logout}>Cerrar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDeleteUser()}>
          <Text style={styles.delete}>Eliminar usuario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditUser;
