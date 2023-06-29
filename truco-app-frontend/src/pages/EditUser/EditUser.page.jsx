import React, { useContext, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as FileSystem from "expo-file-system";
import { UserContext } from "../../context/UserProvider";
import styles from "./EditUser.styles";
import { useNavigate } from "react-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditUser = () => {
  const { user, logout, deleteCurrentUser, editCurrentUser } =
    useContext(UserContext);
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
          onPress: deleteCurrentUser,
        },
      ]
    );
  };

  useEffect(() => {
    if (!user.id) {
      navigate("../login");
    }
  }, []);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      style={{ flex: 1 }}
    >
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
              onPress={handleSubmit(editCurrentUser)}
            >
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNavigateOverview}>
              <Text style={styles.textSecondary}>Cancelar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => logout()}>
            <Text style={styles.logout}>Cerrar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDeleteUser()}>
            <Text style={styles.delete}>Eliminar usuario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditUser;
