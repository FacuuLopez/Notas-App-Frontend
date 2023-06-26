import { Text, View, TextInput, TouchableOpacity } from "react-native";
import loginStyles from "./Login.styles";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-native";
import uuid from 'react-native-uuid';
import * as FileSystem from 'expo-file-system';
import { UserContext } from "../../context/UserProvider";

const Login = ({ esRegistro }) => {
    const [formData, setFormData ] = useState({ username: '', email: '', password: '' })
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleFormDataChange = (data) => {
        setFormData(prevData => ({
            ...prevData,
            ...data
        }))
    }

    const createUser = async () => {
        try {
            const user = { id: uuid.v4(), ...formData};

            if(user.email === '' || user.username === '' || user.password === '') return 

            const filePath = `${FileSystem.documentDirectory}users.json`;
            const fileExists = await FileSystem.getInfoAsync(filePath);
            
            let users = [];

            if (fileExists.exists) {
                const fileContent = await FileSystem.readAsStringAsync(filePath);
                users = JSON.parse(fileContent);
            } 

            users.push(user);
            
            const jsonString = JSON.stringify(users);
            await FileSystem.writeAsStringAsync(filePath, jsonString);
            

            navigate('../login')

        } catch(e) {
            console.log(e)
        } 

        
    };

    const checkUser = async (email, password) => {
        try {
            const filePath = `${FileSystem.documentDirectory}users.json`;
            const fileExists = await FileSystem.getInfoAsync(filePath);
            if (fileExists.exists) {
                const fileContent = await FileSystem.readAsStringAsync(filePath);
                const users = await JSON.parse(fileContent);
                
                const foundUser = users.find(user => user.email === email && user.password === password);

                if (foundUser) {
                    setUser(foundUser);
                    navigate('../overview')
                } else {
                    setFormData(({ username: '', email: '', password: '' }))
                    alert('Credenciales invalidas')
                }

            };
        } catch (e) {
            console.log(e)
        }
    }

     const handleLogin = () => {
        const registrar = () => {
            createUser()
        }
        const iniciarSesion = () => {
            checkUser(formData.email, formData.password)
        }
        esRegistro ? registrar() : iniciarSesion();
    }


    return (
        <View style={loginStyles.contenedor}>
            <View style={loginStyles.body}>
                <Text style={loginStyles.titulo}>{esRegistro ? 'Registrate' : 'Inicia Sesion'}</Text>
                <View>
                    {
                        esRegistro ? 
                        (<View style={loginStyles.campoFormulario}>
                            <Text style={loginStyles.label}>Nombre de usuario</Text>
                            <TextInput
                                style={loginStyles.inputCampo}
                                placeholder="Nombre de usuario"
                                keyboardType="default"
                                value={formData.username}
                                onChangeText={(data) => handleFormDataChange({ username: data })}
                            />
                        </View> ): null
                    }
                    <View style={loginStyles.campoFormulario}>
                        <Text style={loginStyles.label}>Email</Text>
                        <TextInput
                            style={loginStyles.inputCampo}
                            placeholder="Correo electrónico"
                            keyboardType="email-address"
                            value={formData.email}
                            onChangeText={(data) => handleFormDataChange({ email: data })}
                        />
                    </View>
                    <View style={loginStyles.campoFormulario}>
                        <Text style={loginStyles.label}>Password</Text>
                        <TextInput
                            style={loginStyles.inputCampo}
                            placeholder="Contraseña"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(data) => handleFormDataChange({ password: data })}
                        />
                    </View>
                    <TouchableOpacity activeOpacity={0.5} style={loginStyles.boton} onPress={handleLogin}>
                        <Text style={loginStyles.textoBoton}> {esRegistro ? "Registrate" : "Iniciar sesion"} </Text>
                    </TouchableOpacity>
                    <Link
                        style={loginStyles.tienesCuenta}
                        to={esRegistro ? '../login' : '../registro'}
                        underlayColor="#ccc"
                    >
                        <Text style={loginStyles.textoTienesCuenta}>{esRegistro ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}</Text>
                    </Link>
                </View>
            </View>

        </View>
    )
}

export default Login;
