import { StyleSheet, InputTextInput, View } from 'react-native'
import React, { useState } from 'react'

const NotaEditar = (nota) => {
    const { imagen = '', descripcion = '', titulo = '' } = nota;

    const [nuevoTitulo, setNuevoTitulo] = useState(titulo);
    const [nuevaDescripcion, setNuevaDescrepcion] = useState(nuevaDescripcion);

    const onChangeTitulo = (titulo) => setNuevoTitulo(titulo);
    const onChangeDescripcion = (descripcion) = setNuevaDescrepcion(descripcion)
    const guardarNota = () => {

    }

    return (
        <View style={notaEditarStyles.contenedor}>
            <View style={notaEditarStyles.titulo}>
                <Text>
                    Nuevo titulo
                </Text>
                <InputText style={notaEditarStyles.tituloInputTexto}>
                    {titulo}
                </InputText>
            </View>
            <View style={notaEditarStyles.descripcion}>
                <Text>
                    Nueva descripcion
                </Text>
                <InputText style={notaEditarStyles.descripcionInputTexto}>
                    {descripcion}
                </InputText>
            </View>
            <TouchableOpacity style={notaEditarStyles.botonContenedor} onPress={guardarNota} activeOpacity={0.6}>
                <Text style={notaEditarStyles.boton}>Guardar Cambios</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NotaEditar

const notaEditarStyles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    label:{

    },
    titulo: {
       
    },
    tituloInputTexto: {
        placeholder:'nuevo titulo',
        backgroundColor: 'white',
        borderWidth:2,
        borderRadius:3,
        padding:3,
        textAlign:'center'
    },
    descripcion: {

    },
    descripcionInputTexto: {
        placeholder:'nueva descripcion',
        backgroundColor: 'white',
        borderWidth:2,
        borderRadius:3,
        padding:3,
    },
    botonContenedor: {

    },
    boton: {

    }
})