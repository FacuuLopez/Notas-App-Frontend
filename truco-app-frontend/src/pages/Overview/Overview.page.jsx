import { View, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Agenda } from "react-native-calendars";
import { useNavigate } from "react-router-native";
import { UserContext } from "../../context/UserProvider";
import * as FileSystem from "expo-file-system";

const Overview = () => {
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const getNotesById = async (id) => {
    try {
      const filePath = `${FileSystem.documentDirectory}notes.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const notes = JSON.parse(fileContent);

        const matchedNotes = notes.filter((note) => note.userId === id);
        setAllNotes(matchedNotes);
      } else {
        setAllNotes([]);
      }
    } catch (e) {
      console.log(e);
      setAllNotes([]);
    }
  };

  useEffect(() => {
    getNotesById(user.id);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Agenda />
      <Button
        title="Nueva nota"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 10,
          height: 10,
        }}
        onPress={() => {
          navigate("../editar-nota");
        }}
      />
      <Button
        title="Perfil"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 10,
          height: 10,
        }}
        onPress={() => {
          navigate("../perfil");
        }}
      />
    </View>
  );
};

export default Overview;
