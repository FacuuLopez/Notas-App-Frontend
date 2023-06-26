import { Text, View, TextInput, TouchableOpacity } from "react-native";
import loginStyles from "./Login.styles";
import { useState } from "react";
import { Link } from "react-router-native";

const Login = ({ esRegistro }) => {
    const [formData, setFormData ] = useState({ username: '', email: '', password: '' })

    const handleFormDataChange = (data) => {
        setFormData(prevData => ({
            ...prevData,
            ...data
        }))
    }

    const handleLoggin = () => {
        const registrar = () => {
            alert('usuario: ' + email + ' registrado');
        }
        const iniciarSesion = () => {
            alert('usuario: ' + email + ' loguedo');
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
                    <TouchableOpacity activeOpacity={0.5} style={loginStyles.boton} onPress={handleLoggin}>
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
