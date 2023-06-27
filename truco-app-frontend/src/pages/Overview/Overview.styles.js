import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
  },
  button: {
    width: "45%",
  },
  notesContainer: {
    paddingBottom: 20,
  },
  noteContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  noteDate: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  viewNoteButton: {
    marginTop: 10,
  },
  emptyNotesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyNotesText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#888",
  },
});

export default styles;
