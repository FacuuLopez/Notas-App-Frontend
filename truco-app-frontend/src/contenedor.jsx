import { View } from "react-native"
import { Outlet } from "react-router-native"

const Contenedor = () => {
    return(
        <View>
            <Outlet/>
        </View>
    )
}
export default Contenedor;