import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./Note.styles";

const Note = ({ note }) => {
  const { img, title, description } = note;

  return (
    <View style={styles.container}>
      {img && <Image source={{ uri: img }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default Note;
