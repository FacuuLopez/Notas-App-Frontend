import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import SignIn from './src/loggin/signin/sign-in';
import SignUp from './src/loggin/signup/signup';
import Contenedor from './src/contenedor';

export default function App() {
  return (
    <NativeRouter>
      <View>
        <Text>Menu</Text>
      </View>
      <Routes>
        <Route path='/' element={<Contenedor />} />
        <Route index element={<SignIn />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
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
