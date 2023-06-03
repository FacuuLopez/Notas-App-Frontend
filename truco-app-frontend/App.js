import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Loggin from './src/loggin/loggin.component';
import Contenedor from './src/contenedor/contenedor';
import Nota from './src/nota/nota.component';
import NotaEditar from './src/nota-editar/nota-editar.component';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

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
        <Route path={'/'} element={<Contenedor />} >
          <Route index element={<Nota nota={{}} />} />
          <Route path='loggin' element={<Loggin esRegistro={false} />} />
          <Route path='registro' element={<Loggin esRegistro={true} />} />
          <Route path='nota' element={<Nota />} />
          <Route path='editar-nota' element={<NotaEditar />} />
        </Route>
      </Routes>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
