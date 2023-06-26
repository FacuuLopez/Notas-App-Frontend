import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigate } from "react-router";
import uuid from "react-native-uuid";
import { UserContext } from "../../context/UserProvider";

const Crear = () => {
  const [notaData, setNotaData] = useState({ title: "", description: "" });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDataChange = (text) => {
    setNotaData((prev) => ({
      ...prev,
      ...text,
    }));
  };

  const createNote = async () => {
    try {
      const note = { id: uuid.v4(), userId: user.id, ...notaData };

      if (note.title === "" || note.description === "") return;

      const filePath = `${FileSystem.documentDirectory}notes.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      let notes = [];

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        notes = JSON.parse(fileContent);
      }

      users.push(note);

      const jsonString = JSON.stringify(notes);
      await FileSystem.writeAsStringAsync(filePath, jsonString);

      navigate("../overview");
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateNote = () => {
    createNote();
  };

  const handleCancel = () => {
    handleDataChange({ title: "", description: "" });
    navigate("../overview");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Título"
        value={notaData.title}
        onChangeText={(text) => handleDataChange({ title: text })}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Descripción"
        value={notaData.description}
        onChangeText={(text) => handleDataChange({ description: text })}
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Crear" onPress={handleCreateNote} />
        <Button title="Cancelar" onPress={handleCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  descriptionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Crear;
