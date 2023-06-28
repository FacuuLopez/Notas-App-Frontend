import React from "react";
import { View, Button, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigate } from "react-router-native";
import { useNotes } from "../../hooks/useNotes";
import styles from "./Overview.styles";

const Overview = () => {
  const navigate = useNavigate();
  const { allNotes } = useNotes();

  const handleNavigateCreateNote = () => {
    navigate("../createNote");
  };

  const handleNavigateProfile = () => {
    navigate("../profile");
  };

  const renderItem = ({ item }) => {
    const handleViewNote = () => {
      navigate("../note", { state: item });
    };

    return (
      <TouchableOpacity style={styles.noteContainer} onPress={handleViewNote}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteDescription}>{item.description}</Text>
        <Text style={styles.noteDate}>{item.date}</Text>
        <Button
          title="Ver nota"
          onPress={handleViewNote}
          style={styles.viewNoteButton}
        />
      </TouchableOpacity>
    );
  };

  const renderEmptyNotes = () => (
    <View style={styles.emptyNotesContainer}>
      <Text style={styles.emptyNotesText}>No hay notas creadas</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {allNotes.length > 0 ? (
        <FlatList
          data={allNotes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notesContainer}
        />
      ) : (
        renderEmptyNotes()
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="New note"
          onPress={handleNavigateCreateNote}
          style={styles.button}
        />
        <Button
          title="Perfil"
          onPress={handleNavigateProfile}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Overview;
