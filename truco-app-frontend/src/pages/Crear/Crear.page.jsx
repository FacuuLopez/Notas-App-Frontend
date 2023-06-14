import { StyleSheet ,Text, TouchableOpacity, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colorTema1 } from '../../utils/colors';

const NotaEditar = ({nota}) => {
    const colores = colorTema1;

    const {descripcion = '', titulo = '' } = nota;

    const [nuevoTitulo, setNuevoTitulo] = useState(titulo);
    const [nuevaDescripcion, setNuevaDescrepcion] = useState(descripcion);

    const onChangeTitulo = (titulo) => setNuevoTitulo(titulo);
    const onChangeDescripcion = (descripcion) => setNuevaDescrepcion(descripcion)
    const guardarNota = () => {

    }

    return (
        <View style={notaEditarStyles.contenedor}>
            <View style={notaEditarStyles.titulo}>
                <TextInput style={notaEditarStyles.tituloInputTexto} onChangeText={onChangeTitulo} placeholder="Titulo">
                    {nuevoTitulo}
                </TextInput>
            </View>
            <View style={notaEditarStyles.descripcion}>
                <TextInput style={notaEditarStyles.descripcionInputTexto}
                 onChangeText={onChangeDescripcion}
                 placeholder="Descripcion"
                 multiline>
                    {nuevaDescripcion}
                </TextInput>
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
        marginBottom:3,
        marginTop:15,
        fontSize:16,
        fontWeight:'bold'
    },
    titulo: {
        marginBottom:3
    },
    tituloInputTexto: {
        placeholder:'nuevo titulo',
        backgroundColor: 'white',
        borderWidth:2,
        borderRadius:3,
        padding:8,
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
    },
    descripcion: {
        flex:1,
    },
    descripcionInputTexto: {
        flex:1,
        paddingVertical:20,
        paddingHorizontal:10,
        fontSize:16,
        textAlignVertical: "top",
        placeholder:'nueva descripcion',
        backgroundColor: 'white',
        borderWidth:2,
        borderRadius:3,
        padding:3,
    },
    botonContenedor: {
        marginTop:25,
        padding:7,
        backgroundColor: colorTema1.primary,
        alignSelf:'center',
        borderRadius:5,
    },
    boton: {
        color: colorTema1.light,
        textTransform:'uppercase',
        fontSize:22,
    }
})