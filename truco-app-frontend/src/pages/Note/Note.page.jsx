import React from "react";
import { View, Image, Text, Button } from "react-native";
import styles from "./Note.styles";
import { useLocation, useNavigate } from "react-router-native";

const Note = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const note = location.state;
  const { title, description, img } = note;

  const handleNavigateOverview = () => {
    navigate("../overview");
  };

  const handleNavigateEditNote = () => {
    navigate("../editNote", { state: note });
  };

  return (
    <View style={styles.container}>
      {img && <Image source={{ uri: img }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Notas" onPress={handleNavigateOverview} />
        <Button title="Editar" onPress={handleNavigateEditNote} />
      </View>
    </View>
  );
};

export default Note;
