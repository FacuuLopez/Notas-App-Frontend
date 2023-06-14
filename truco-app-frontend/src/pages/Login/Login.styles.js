import { StyleSheet } from "react-native";

const logginStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  body: {
    width: "80%",
    alignSelf: "center",
  },
  titulo: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 35,
    textAlign: "center",
  },
  campoFormulario: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 24,
    marginBottom: 3,
  },
  inputCampo: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  boton: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  textoBoton: {
    fontSize: 16,
    color: "white",
  },
  tienesCuenta: {
    marginHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 5,
  },
  textoTienesCuenta: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default logginStyles;
