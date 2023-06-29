import React, { createContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });

  const getUsers = async () => {
    const filePath = `${FileSystem.documentDirectory}users.json`;
    const fileExists = await FileSystem.getInfoAsync(filePath);

    if (fileExists.exists) {
      const fileContent = await FileSystem.readAsStringAsync(filePath);
      return JSON.parse(fileContent);
    }

    return [];
  };

  const login = async (email, password) => {
    try {
      const foundUser = getUsers().find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        AsyncStorage.setItem("userId", foundUser.id);

        navigate("../overview");
      } else {
        alert("Credenciales inválidas");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const autoLogin = async () => {
    try {
      const userId = AsyncStorage.getItem("userId");
      if (userId) {
        const foundUser = getUsers().find(
          (user) => user.id === email && user.password === password
        );

        if (foundUser) {
          setUser(foundUser);
          navigate("../overview");
        }
      } else {
        AsyncStorage.setItem("userId", null);
        navigate("../login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCurrentUser = async () => {
    try {
      const userId = AsyncStorage.getItem("userId");
      if (userId) {
        const newUsers = getUsers().filter((u) => u.id !== userId);

        if (newUsers.length < users.length) {
          const jsonString = JSON.stringify(newUsers);
          await FileSystem.writeAsStringAsync(filePath, jsonString);

          alert("Perfil eliminado exitosamente");

          AsyncStorage.setItem("userId", null);
          navigate("../login");
        } else {
          alert("No es posible eliminar el usuario");
          return;
        }
      } else {
        alert("No está iniciada la sesión, no se puede eliminar");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editCurrentUser = async (editedUser) => {
    try {
      const existingUser = getUsers().find(
        (existingUser) =>
          (existingUser.email === editedUser.email &&
            existingUser.email !== user.email) ||
          (existingUser.username === editedUser.username &&
            existingUser.username !== user.username)
      );

      if (existingUser) {
        alert("El correo electronico o nombre de usuario ya existen");
        return;
      }

      const updatedUser = { ...user, ...editedUser };

      const updatedUsers = users.map((existingUser) =>
        existingUser.id === updatedUser.id ? updatedUser : existingUser
      );

      const jsonString = JSON.stringify(updatedUsers);
      await FileSystem.writeAsStringAsync(filePath, jsonString);

      setUser(updatedUser);

      alert("Perfil actualizado exitosamente");

      handleNavigateProfile();
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    setUser({
      id: "",
      username: "",
      email: "",
      password: "",
    });
    AsyncStorage.setItem("userId", null);

    navigate("../overview");
  };

  const register = async (data) => {
    try {
      const user = { id: uuid.v4(), ...data };

      let users = getUsers();

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
  };

  autoLogin();

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        editCurrentUser,
        deleteCurrentUser,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
