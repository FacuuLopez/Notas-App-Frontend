import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, Button, ActivityIndicator } from "react-native";
import styles from "./Note.styles";
import userContext from "../../context/userContext";

export const Note = ({ route, navigation }) => {
  const { user } = useContext(userContext);
  const noteReceived = route.params;
  const [note, setNote] = useState({ title: "", description: "", img: "" });
  const color = Platform.OS === "android" ? "#2196F3" : "#007AFF";

  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const handleNavigateOverview = () => {
    navigation.navigate("overview");
  };

  const handleNavigateEditNote = () => {
    navigation.navigate("editNote", note);
  };

  useEffect(() => {
    if (user?.id && noteReceived?.title) {
      setNote({ ...noteReceived });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {isLoadingImage ? (
          <View style={styles.imageLoader}>
            <ActivityIndicator size="large" color={color} />
          </View>
        ) : (
          <></>
        )}
        {note.img ? (
          <Image
            source={{ uri: note.img }}
            style={styles.image}
            onLoadStart={() => setIsLoadingImage(true)}
            onLoad={() => setIsLoadingImage(false)}
          />
        ) : null}
      </View>

      <Text style={styles.title}>{note?.title}</Text>
      <Text style={styles.description}>{note?.description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Notas" onPress={handleNavigateOverview} />
        <Button title="Editar" onPress={handleNavigateEditNote} />
      </View>
    </View>
  );
};
