import { View, Button } from "react-native";
import React, { useContext, useEffect } from "react";
import { Agenda } from "react-native-calendars";
import { useNavigate } from "react-router-native";
import { UserContext } from "../../context/UserProvider";

const Overview = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log('Overview', user)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Agenda />
      <Button
        title="New note"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 10,
          height: 10,
        }}
        onPress={() => {
          navigate("editar-nota");
        }}
      />
    </View>
  );
};

export default Overview;
