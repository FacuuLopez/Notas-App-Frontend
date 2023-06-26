import { View } from "react-native";
import { Outlet } from "react-router-native";
import styles from "./Container.styles";

const Container = () => {
  return (
    <View style={styles.contenedor}>
      <Outlet />
    </View>
  );
};

export default Container;
