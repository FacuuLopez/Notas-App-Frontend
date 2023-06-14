import { Text, View, TextInput, TouchableOpacity } from "react-native";
import logginStyles from "./Login.styles";
import { useState } from "react";
import { Link } from "react-router-native";

const Loggin = ({ esRegistro }) => {
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
        <View style={logginStyles.contenedor}>
            <View style={logginStyles.body}>
                <Text style={logginStyles.titulo}>{esRegistro ? 'Registrate' : 'Inicia Sesion'}</Text>
                <View>
                    {
                        esRegistro ? 
                        (<View style={logginStyles.campoFormulario}>
                            <Text style={logginStyles.label}>Nombre de usuario</Text>
                            <TextInput
                                style={logginStyles.inputCampo}
                                placeholder="Nombre de usuario"
                                keyboardType="default"
                                value={formData.username}
                                onChangeText={(data) => handleFormDataChange({ username: data })}
                            />
                        </View> ): null
                    }
                    <View style={logginStyles.campoFormulario}>
                        <Text style={logginStyles.label}>Email</Text>
                        <TextInput
                            style={logginStyles.inputCampo}
                            placeholder="Correo electrónico"
                            keyboardType="email-address"
                            value={formData.email}
                            onChangeText={(data) => handleFormDataChange({ email: data })}
                        />
                    </View>
                    <View style={logginStyles.campoFormulario}>
                        <Text style={logginStyles.label}>Password</Text>
                        <TextInput
                            style={logginStyles.inputCampo}
                            placeholder="Contraseña"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(data) => handleFormDataChange({ password: data })}
                        />
                    </View>
                    <TouchableOpacity activeOpacity={0.5} style={logginStyles.boton} onPress={handleLoggin}>
                        <Text style={logginStyles.textoBoton}> {esRegistro ? "Registrate" : "Iniciar sesion"} </Text>
                    </TouchableOpacity>
                    <Link
                        style={logginStyles.tienesCuenta}
                        to={esRegistro ? '../loggin' : '../registro'}
                        underlayColor="#ccc"
                    >
                        <Text style={logginStyles.textoTienesCuenta}>{esRegistro ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}</Text>
                    </Link>
                </View>
            </View>

        </View>
    )
}

export default Loggin;
