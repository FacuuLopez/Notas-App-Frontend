import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as FileSystem from "expo-file-system";
import { useNavigate, useLocation } from "react-router";
import styles from "./EditNote.styles";
import { UserContext } from "../../context/UserProvider";

const EditNote = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const noteReceived = location.state;
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    userId: "",
    img: "",
  });
  const { user } = useContext(UserContext);

  const handleNavigateOverview = () => {
    navigate("../overview");
  };

  const handleDeleteNote = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estas seguro de que deseas eliminar esta nota?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: confirmDeleteNote,
        },
      ]
    );
  };

  const confirmDeleteNote = async () => {
    try {
      const noteId = note.id;
      const filePath = `${FileSystem.documentDirectory}notes.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const notes = JSON.parse(fileContent);

        const newNotes = notes.filter((note) => note.id !== noteId);

        if (newNotes.length < notes.length) {
          const jsonString = JSON.stringify(newNotes);
          await FileSystem.writeAsStringAsync(filePath, jsonString);

          alert("Nota eliminada exitosamente");

          navigate("../overview");
        } else {
          alert("No es posible eliminar la nota");
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (data) => {
    try {
      const editedNote = {
        id: note.id,
        title: data.title,
        description: data.description,
        userId: note.userId,
        img: note.img,
      };

      const filePath = `${FileSystem.documentDirectory}notes.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const notes = JSON.parse(fileContent);

        const updatedNotes = notes.map((n) =>
          n.id === editedNote.id ? editedNote : note
        );

        const jsonString = JSON.stringify(updatedNotes);
        await FileSystem.writeAsStringAsync(filePath, jsonString);

        alert("Nota actualizada exitosamente");

        navigate("../overview");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!user?.id || !noteReceived?.title) {
      console.log(user?.id, noteReceived?.title);
      navigate("../login");
    } else {
      setNote({ ...noteReceived });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Editar nota</Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="title"
          defaultValue={note?.title}
          rules={{
            required: "Título requerido",
            minLength: {
              value: 5,
              message: "El campo debe tener al menos 5 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.title && (
                <Text style={styles.error}>{errors.title.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="description"
          defaultValue={note?.description}
          rules={{
            required: "Descripción requerida",
            minLength: {
              value: 5,
              message: "El campo debe tener al menos 5 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainerDescription}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={styles.inputDescription}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline={true}
              />
              {errors.description && (
                <Text style={styles.error}>{errors.description.message}</Text>
              )}
            </View>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNavigateOverview}>
          <Text style={styles.textSecondary}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleDeleteNote}>
        <Text style={styles.delete}>Eliminar nota</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditNote;
