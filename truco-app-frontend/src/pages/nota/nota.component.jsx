import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { colorTema1 } from '../../utils/colors';
import notaPapel from '../../../assets/imagenes/notaPapel.png';

const Nota = ({ nota }) => {
    const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolor aspernatur ad vitae tempore voluptates eaque molestiae. Nostrum quo nesciunt deserunt ullam delectus! Ad at nemo amet consequuntur blanditiis aut! '
    const { imagen = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhln4-ygosRcYC8XLmLPuh_bxZXFH8xpD48w&usqp=CAU', titulo = 'nueva nota', descripcion = lorem } = nota;
    const colores = colorTema1;
    const fondoDescripcion = '../../assets/imagenes/NotaPapel.jpg';

    const notaStyles = StyleSheet.create({
        contenedor: {
            flex: 1,
            flexDirection: 'row'
        },
        imagen: {
            flex: 2,
            resizeMode: 'cover',
            marginVertical: '10%'
        },
        notaContenedor: {
            flex: 5,
            marginLeft:20
        },
        titulo: {

        },
        tituloTexto: {
            textAlign: 'center',
            color: colores.dark,
            textTransform: 'uppercase',
            fontWeight:'bold',
            textDecorationLine: 'underline',
            fontSize: 28,
            paddingTop: '50%',

            paddingBottom: '10%',
        },
        descripcion: {
            flex: 1
        },
        descripcionTexto: {
            color: colores.dark,
            fontSize: 20,
            paddingHorizontal:10
        }
    })

    return (
        <View style={notaStyles.contenedor}>
            <View style={notaStyles.imagen}>
                <Image source={{ uri: imagen }} resizeMode='cover' style={notaStyles.imagen} />
            </View>
            <View style={notaStyles.notaContenedor}>
                <ImageBackground style={{flex:1}} source={notaPapel} resizeMode="cover">
                    <View style={notaStyles.titulo}>
                        <Text style={notaStyles.tituloTexto}>
                            {titulo}
                        </Text>
                    </View>
                    <View style={notaStyles.descripcion}>
                        <Text style={notaStyles.descripcionTexto}>
                            {descripcion}
                        </Text>
                    </View>
                </ImageBackground >
            </View>

        </View >
    )
}

export default Nota;
