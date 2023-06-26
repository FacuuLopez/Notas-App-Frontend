import { View, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Agenda } from "react-native-calendars";
import { useNavigate } from "react-router-native";
import { UserContext } from "../../context/UserProvider";
import { useNotes } from "../../hooks/useNotes";

import * as FileSystem from "expo-file-system";
import styles from "./Overview.styles";

const Overview = () => {
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { notes } = useNotes();

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
    <View style={styles.container}>
      <Agenda />
      <Button
        title="New note"
        style={styles.button}
        items={notes.reduce(
          (items, note) =>
            (items[note.date.toISOString()] = { name: note.title }),
          {}
        )}
        onPress={() => {
          navigate("../editar-nota");
        }}
      />
      <Button
        title="Perfil"
        style={styles.button}
        onPress={() => {
          navigate("../perfil");
        }}
      />
    </View>
  );
};

export default Overview;
