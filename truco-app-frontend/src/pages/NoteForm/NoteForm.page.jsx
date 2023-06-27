import React, { useContext, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { UserContext } from "../../context/UserProvider";
import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";
import styles from "./NoteForm.styles";
import { useNotes } from "../../hooks/useNotes";

const NoteForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { createNote } = useNotes();

  const submitNote = handleSubmit(async (data) =>
    createNote(data, () => navigate("../overview"))
  );

  const handleCancel = () => {
    navigate("../overview");
  };

  useEffect(() => {
    if (!user.id) {
      navigate("../login");
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

export default NoteForm;
