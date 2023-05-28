import React from "react";
import { View, Text, Button } from "react-native";
import LogginForm from "../loggin-form/loggin-form.component";
import { Link } from "react-router-native";

const SignIn = () => {
    const handleLogin = () => { }

    return (
        <View>
            <Text>Logueate</Text>
            <LogginForm />
            <Button title="Iniciar sesión" onPress={handleLogin} />
            <Link to='/signup'>
                <Text>
                    ¿Todavia no tienes una cuenta?
                </Text>
            </Link>
        </View>
    )
}

export default SignIn;