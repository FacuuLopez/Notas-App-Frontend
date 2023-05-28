import { Text, TextInput, View } from "react-native";
import logginFormStyles from "./loggin-form.styles";
import { useState } from "react";

const LogginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (email) => setEmail(email);

    const handlePasswordChange = (password) => setPassword(email);
    
    return (
        <View style={logginFormStyles.body}>
            <View>
                <Text>Email</Text>
                <TextInput
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={handleEmailChange}
                />
            </View>
            <View>
                <Text>Password</Text>
                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={handlePasswordChange}
                />
            </View>
            

        </View>
    )
}

export default LogginForm