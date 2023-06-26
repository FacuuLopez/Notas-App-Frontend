import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Nota = ({ nota }) => {
  const { imagen, titulo, descripcion } = nota;

  return (
    <View style={styles.container}>
      {imagen && <Image source={{ uri: imagen }} style={styles.image} />}
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.description}>{descripcion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    height: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default Nota;
