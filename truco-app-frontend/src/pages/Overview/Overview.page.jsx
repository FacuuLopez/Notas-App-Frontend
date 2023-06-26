import { View, Button } from "react-native";
import React from "react";
import { Agenda } from "react-native-calendars";
import { useNavigate } from "react-router-native";
import { useNotes } from "../../hooks/useNotes";

const Overview = () => {
  const navigate = useNavigate(true);

  const { notes } = useNotes;

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
        items={notes.reduce(
          (items, note) =>
            (items[note.date.toISOString()] = { name: note.title }),
          {}
        )}
        onPress={() => {
          navigate("editar-nota");
        }}
      />
    </View>
  );
};

export default Overview;
