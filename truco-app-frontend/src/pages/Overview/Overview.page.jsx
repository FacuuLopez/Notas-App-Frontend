import { View, Button } from "react-native";
import React, { useContext, useEffect } from "react";
import { Agenda } from "react-native-calendars";
import { useNavigate } from "react-router-native";
import { UserContext } from "../../context/UserProvider";
import { useNotes } from "../../hooks/useNotes";

import styles from "./Overview.styles";

const Overview = () => {
  const navigate = useNavigate();

  const { overviewNotes } = useNotes();

  console.log(overviewNotes);

  return (
    <View style={styles.container}>
      <Agenda items={overviewNotes} />
      <Button
        title="New note"
        style={styles.button}
        onPress={() => {
          navigate("../createNote");
        }}
      />
      <Button
        title="Perfil"
        style={styles.button}
        onPress={() => {
          navigate("../profile");
        }}
      />
    </View>
  );
};

export default Overview;
