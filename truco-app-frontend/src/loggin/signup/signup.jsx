import React from "react";
import { View, Text, Button } from "react-native";
import LogginForm from "../loggin-form/loggin-form.component";
import { Link } from "react-router-native";

const SignUp = () => {

    const handleSignUp = () => {}
    return(
        <View >
            <Text>Registrate</Text>
            <LogginForm />
            <Button title="Registrate" onPress={handleSignUp} />
            <Link to='/signin'>
                <Text>¿Ya una cuenta?</Text>
            </Link>
            
        </View>
    )
} 

export default SignUp;