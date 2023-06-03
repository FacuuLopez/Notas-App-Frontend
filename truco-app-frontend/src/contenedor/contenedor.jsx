import { StyleSheet, View } from "react-native"
import { Outlet } from "react-router-native"
import { colorTema1} from "../utils/colors"

const Contenedor = () => {
    const colores = colorTema1

    const contenedorStyles = StyleSheet.create({
        contenedor:{
            flex:1,
            backgroundColor: colores.light,
            paddingVertical:'10%',
            paddingHorizontal: '5%'
        }
    })

    return(
        <View style={contenedorStyles.contenedor}>
            <Outlet/>
        </View>
    )
}



export default Contenedor;