import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import Contenedor from "./src/pages/contenedor/contenedor";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import Nota from "./src/pages/Nota/Nota.page";
import Loggin from "./src/pages/Login/Login.page";
import NotaEditar from "./src/pages/Crear/Crear.page";

export default function App() {
  useEffect(() => {
    async function desbloquearOrientacion() {
      await ScreenOrientation.unlockAsync();
    }
    desbloquearOrientacion();
  }, []);

  return (
    <NativeRouter>
      <Routes>
        <Route path={"/"} element={<Contenedor />}>
          <Route index element={<Loggin esRegistro={false} />} />
          <Route path="loggin" element={<Loggin esRegistro={false} />} />
          <Route path="registro" element={<Loggin esRegistro={true} />} />
          <Route path="nota" element={<Nota />} />
          <Route path="editar-nota" element={<NotaEditar nota={{}} />} />
        </Route>
      </Routes>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
