import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import Contenedor from "./src/pages/contenedor/contenedor";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import Nota from "./src/pages/Nota/Nota.page";
import Login from "./src/pages/Login/Login.page";
import Crear from "./src/pages/Crear/Crear.page";
import Overview from "./src/pages/Overview/Overview.page";

export default function App() {
  useEffect(() => {
    async function desbloquearOrientacion() {
      await ScreenOrientation.unlockAsync();
    }
    desbloquearOrientacion();
  }, []);

  const nota = {
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhln4-ygosRcYC8XLmLPuh_bxZXFH8xpD48w&usqp=CAU",
    titulo: "Titulo de la nota",
    descripcion: "Descripcion de la nota",
  };

  return (
    <NativeRouter>
      <Routes>
        <Route path={"/"} element={<Contenedor />}>
          <Route index element={<Login esRegistro={false} />} />
          <Route path="login" element={<Login esRegistro={false} />} />
          <Route path="registro" element={<Login esRegistro={true} />} />
          <Route path="overview" element={<Overview />} />
          <Route path="nota" element={<Nota nota={nota} />} />
          <Route path="editar-nota" element={<Crear nota={{}} />} />
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
