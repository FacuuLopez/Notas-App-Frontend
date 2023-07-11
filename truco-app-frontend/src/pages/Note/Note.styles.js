import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    paddingTop: 50,
    marginBottom: 16,
    height: "100%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  imageLoader: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  descriptionContainer: {
    maxHeight: 420,
    marginBottom: 16,
  },
});

export default styles;
