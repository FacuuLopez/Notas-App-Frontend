import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    padding: 8,
  },
  descriptionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    marginTop: 20,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default styles;
