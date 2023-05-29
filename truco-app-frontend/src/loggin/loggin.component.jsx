import { Text, View, TextInput, TouchableOpacity } from "react-native";
import logginStyles from "./login.styles";
import { useState } from "react";
import { Link } from "react-router-native";

const Loggin = ({ esRegistro }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (email) => setEmail(email);
    const handlePasswordChange = (password) => setPassword(password);

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
                    <View style={logginStyles.campoFormulario}>
                        <Text style={logginStyles.label}>Email</Text>
                        <TextInput
                            style={logginStyles.inputCampo}
                            placeholder="Correo electrónico"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={handleEmailChange}
                        />
                    </View>
                    <View style={logginStyles.campoFormulario}>
                        <Text style={logginStyles.label}>Password</Text>
                        <TextInput
                            style={logginStyles.inputCampo}
                            placeholder="Contraseña"
                            secureTextEntry
                            value={password}
                            onChangeText={handlePasswordChange}
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
