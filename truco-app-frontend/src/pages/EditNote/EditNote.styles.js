import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputContainerDescription: {
    marginBottom: 20,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 16,
  },
  inputDescription: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  textSecondary: {
    marginTop: 5,
    fontSize: 18,
    color: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  delete: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default styles;
