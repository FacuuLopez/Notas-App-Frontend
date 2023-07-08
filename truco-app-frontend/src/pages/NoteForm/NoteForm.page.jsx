import React, { useContext, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import userContext from "../../context/userContext";
import styles from "./NoteForm.styles";
import { useNotes } from "../../hooks/useNotes";

export const NoteForm = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(userContext);

  const { createNote } = useNotes();

  const submitNote = handleSubmit(async (data) => {
    createNote(data);
    navigation.navigate("overview");
  });

  const handleCancel = () => {
    navigation.navigate("overview");
  };

  useEffect(() => {
    if (!user.id) {
      navigation.navigate("login");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        rules={{
          required: "Ingrese un título",
          minLength: {
            value: 5,
            message: "El campo debe tener al menos 5 caracteres",
          },
        }}
        defaultValue=""
        render={({ field }) => (
          <>
            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Título"
              value={field.value}
              onChangeText={field.onChange}
            />
            {errors.title && (
              <Text style={styles.error}>{errors.title.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="description"
        rules={{
          required: "Ingrese una descripción",
          minLength: {
            value: 15,
            message: "El campo debe tener al menos 15 caracteres",
          },
        }}
        defaultValue=""
        render={({ field }) => (
          <>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Descripción"
              value={field.value}
              onChangeText={field.onChange}
              multiline
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description.message}</Text>
            )}
          </>
        )}
      />

      <View style={styles.buttonContainer}>
        <Button title="Crear" onPress={submitNote} />
        <Button title="Cancelar" onPress={handleCancel} />
      </View>
    </View>
  );
};
