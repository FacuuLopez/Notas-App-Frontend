import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  body: {
    width: "80%",
    alignSelf: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 24,
    marginBottom: 3,
    marginTop: 20,
  },
  inputField: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  textButton: {
    fontSize: 16,
    color: "white",
  },
  hasAnAccount: {
    marginHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: "red",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default styles;
