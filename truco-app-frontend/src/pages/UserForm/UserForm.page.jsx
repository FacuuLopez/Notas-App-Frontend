import React, { useContext } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-native";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";
import { UserContext } from "../../context/UserProvider";
import styles from "./UserForm.styles";

const UserForm = ({ isRegister }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleRegister = handleSubmit(async (data) => {
    try {
      const user = { id: uuid.v4(), ...data };

      const filePath = `${FileSystem.documentDirectory}users.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      let users = [];

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        users = JSON.parse(fileContent);
      }

      const existingUser = users.find(
        (existingUser) =>
          existingUser.username === user.username ||
          existingUser.email === user.email
      );

      if (existingUser) {
        alert("El nombre de usuario o email ya existen");
        return;
      }

      users.push(user);

      const jsonString = JSON.stringify(users);
      await FileSystem.writeAsStringAsync(filePath, jsonString);

      navigate("../login");
    } catch (e) {
      console.log(e);
    }
  });

  const handleLogin = handleSubmit(async (data) => {
    try {
      const { email, password } = data;

      const filePath = `${FileSystem.documentDirectory}users.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const users = JSON.parse(fileContent);

        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (foundUser) {
          setUser(foundUser);
          navigate("../overview");
        } else {
          alert("Credenciales inválidas");
        }
      }
    } catch (e) {
      console.log(e);
    }
  });

  const handleFormSubmit = isRegister ? handleRegister : handleLogin;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>
          {isRegister ? "Registrate" : "Inicia Sesion"}
        </Text>
        <View>
          {isRegister && (
            <Controller
              styles={styles.FormField}
              control={control}
              name="username"
              rules={{
                required: "Ingrese un nombre de usuario",
                minLength: {
                  value: 5,
                  message: "El campo debe tener al menos 5 caracteres",
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <>
                  <Text style={styles.label}>Nombre de usuario</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Nombre de usuario"
                    keyboardType="default"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                  {errors.username && (
                    <Text style={styles.error}>{errors.username.message}</Text>
                  )}
                </>
              )}
            />
          )}
          <Controller
            control={control}
            styles={styles.FormField}
            name="email"
            rules={{
              required: "Ingrese un correo electrónico",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ingrese un correo electrónico válido",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  value={field.value}
                  onChangeText={field.onChange}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Ingrese una contraseña",
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
                message: "El campo de contraseña debe ser alfanumérico",
              },
              minLength: {
                value: 5,
                message: "El campo debe tener al menos 5 caracteres",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Contraseña"
                  secureTextEntry
                  value={field.value}
                  onChangeText={field.onChange}
                />
                {errors.password && (
                  <Text style={styles.error}>{errors.password.message}</Text>
                )}
              </>
            )}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={handleFormSubmit}
          >
            <Text style={styles.textButton}>
              {isRegister ? "Registrate" : "Iniciar sesión"}
            </Text>
          </TouchableOpacity>

          <Link
            style={styles.hasAnAccount}
            to={isRegister ? "../login" : "../register"}
            underlayColor="#ccc"
          >
            <Text style={styles.textHasAnAccount}>
              {isRegister ? "¿Ya tienes una cuenta?" : "¿Aún no tienes cuenta?"}
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default UserForm;
