import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-native";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";
import { UserContext } from "../../context/UserProvider";
import styles from "./UserForm.styles";

const UserForm = ({ isRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleFormDataChange = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const createUser = async () => {
    try {
      const user = { id: uuid.v4(), ...formData };

      if (user.email === "" || user.username === "" || user.password === "")
        return;

      const filePath = `${FileSystem.documentDirectory}users.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      let users = [];

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        users = JSON.parse(fileContent);
      }

      users.push(user);

      const jsonString = JSON.stringify(users);
      await FileSystem.writeAsStringAsync(filePath, jsonString);

      navigate("../login");
    } catch (e) {
      console.log(e);
    }
  };

  const checkUser = async (email, password) => {
    try {
      const filePath = `${FileSystem.documentDirectory}users.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);
      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const users = await JSON.parse(fileContent);

        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (foundUser) {
          setUser(foundUser);
          navigate("../overview");
        } else {
          setFormData({ username: "", email: "", password: "" });
          alert("Credenciales invalidas");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = () => {
    const registrar = () => {
      createUser();
    };
    const iniciarSesion = () => {
      checkUser(formData.email, formData.password);
    };
    isRegister ? registrar() : iniciarSesion();
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>
          {isRegister ? "Registrate" : "Inicia Sesion"}
        </Text>
        <View>
          {isRegister ? (
            <View style={styles.FormField}>
              <Text style={styles.label}>Nombre de usuario</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Nombre de usuario"
                keyboardType="default"
                value={formData.username}
                onChangeText={(data) =>
                  handleFormDataChange({ username: data })
                }
              />
            </View>
          ) : null}
          <View style={styles.FormField}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(data) => handleFormDataChange({ email: data })}
            />
          </View>
          <View style={styles.FormField}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Contraseña"
              secureTextEntry
              value={formData.password}
              onChangeText={(data) => handleFormDataChange({ password: data })}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.textButton}>
              {" "}
              {isRegister ? "Registrate" : "Iniciar sesion"}{" "}
            </Text>
          </TouchableOpacity>
          <Link
            style={styles.hasAnAccount}
            to={isRegister ? "../login" : "../registro"}
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
