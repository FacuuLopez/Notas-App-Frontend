import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, Button, ActivityIndicator } from "react-native";
import styles from "./Note.styles";
import { UserContext } from "../../context/UserProvider";

const Note = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const noteReceived = route.params;
  const [note, setNote] = useState({ title: "", description: "", img: "" });

  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const handleNavigateOverview = () => {
    navigation.navigate("overview");
  };

  const handleNavigateEditNote = () => {
    navigation.navigate("editNote", note);
  };

  useEffect(() => {
    if (!user?.id || !noteReceived?.title) {
      navigation.navigate("login");
    } else {
      setNote({ ...noteReceived });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {isLoadingImage ? (
          <View style={styles.imageLoader}>
            <ActivityIndicator size="large" color="#0000ff" />
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

export default Note;
