import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, Button } from "react-native";
import styles from "./Note.styles";
import { useLocation, useNavigate } from "react-router-native";
import { UserContext } from "../../context/UserProvider";

const Note = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const noteReceived = location.state;
  const [note, setNote] = useState({ title: "", description: "", img: "" });

  const handleNavigateOverview = () => {
    navigate("../overview");
  };

  const handleNavigateEditNote = () => {
    navigate("../editNote", { state: note });
  };

  useEffect(() => {
    if (!user?.id || !noteReceived?.title) {
      navigate("../login");
    } else {
      setNote({ ...noteReceived });
    }
  }, []);

  return (
    <View style={styles.container}>
      {note?.img && <Image source={{ uri: note.img }} style={styles.image} />}
      <Text style={styles.title}>{note?.title}</Text>
      <Text style={styles.description}>{note?.description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Notas" onPress={handleNavigateOverview} />
        <Button title="Editar" onPress={handleNavigateEditNote} />
      </View>
    </View>
  );
};

export default Note;
