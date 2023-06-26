import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Crear = () => {
  const [notaData, setNotaData] = useState({ title: '', description: ''});

  const handleDataChange = (text) => {
    setNotaData(prev => ({
        ...prev,
        ...text
    }))
  };

  const handleCreateNote = () => {
    console.log('Título:', title);
    console.log('Descripción:', description);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Título"
        value={notaData.title}
        onChangeText={(text) => handleDataChange({title: text})}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Descripción"
        value={notaData.description}
        onChangeText={(text) => handleDataChange({description: text})}
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Crear" onPress={handleCreateNote} />
        <Button title="Cancelar" onPress={handleCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  descriptionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Crear;
