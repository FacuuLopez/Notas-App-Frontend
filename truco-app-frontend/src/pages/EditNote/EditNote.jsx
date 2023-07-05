import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import styles from "./EditNote.styles";
import { UserContext } from "../../context/UserProvider";
import { useNotes } from "../../hooks/useNotes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditNote = ({ route, navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const noteReceived = route.params;
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    userId: "",
    img: "",
    date: "",
  });
  const { user } = useContext(UserContext);

  const { editNote, deleteNote } = useNotes();

  const handleNavigateOverview = () => {
    navigation.navigate("overview");
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

  const confirmDeleteNote = async () =>
    deleteNote(note.id, () => {
      alert("Nota eliminada exitosamente");
      navigation.navigate("overview");
    });

  const onSubmit = async (data) => {
    const editedNote = {
      id: note.id,
      title: data.title,
      description: data.description,
      userId: note.userId,
      date: note.date,
      img: `https://image.pollinations.ai/prompt/${data.title}`,
    };
    console.log("pepe");
    editNote(editedNote, () => {
      alert("Nota actualizada exitosamente");
      navigation.navigate("overview");
    });
  };

  useEffect(() => {
    if (!user?.id || !noteReceived?.title) {
      navigation.navigate("login");
    } else {
      setNote({ ...noteReceived });
    }
  }, []);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Editar nota</Text>
        <View style={styles.formContainer}>
          {note.title ? (
            <>
              <Controller
                control={control}
                name="title"
                defaultValue={note.title}
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
                defaultValue={note.description}
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
                      <Text style={styles.error}>
                        {errors.description.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
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
    </KeyboardAwareScrollView>
  );
};

export default EditNote;
