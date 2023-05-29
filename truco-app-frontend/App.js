import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Loggin from './src/loggin/loggin.component';
import Contenedor from './src/contenedor';

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route path='/' element={<Contenedor />} />
        <Route index element={<Loggin esRegistro={false} />} />
        <Route path='loggin' element={<Loggin esRegistro={false} />} />
        <Route path='registro' element={<Loggin esRegistro={true} />} />
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
