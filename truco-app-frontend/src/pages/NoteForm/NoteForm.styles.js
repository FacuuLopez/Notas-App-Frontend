import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  descriptionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
