import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  titulo: string;
  subtitulo: string;
}

export default function HeaderCadastro({ titulo, subtitulo }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, alignItems: 'center' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#2D3748' },
  subtitulo: { fontSize: 14, color: '#718096', marginTop: 4, textAlign: 'center' },
});