import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import { Trash2, Sparkles } from 'lucide-react-native';

export default function DescarregoScreen() {
  const [pensamento, setPensamento] = useState('');
  const [descartado, setDescartado] = useState(false);

  const descartarPensamento = () => {
    if (!pensamento.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setDescartado(true);
    setTimeout(() => {
      setPensamento('');
      setDescartado(false);
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Lixeira de Pensamentos</Text>
      <Text style={styles.subtitle}>Escreva o que está pesando no seu peito e jogue fora.</Text>

      {!descartado ? (
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="O que está pesando na sua mente agora?"
            placeholderTextColor="#A0AEC0"
            value={pensamento}
            onChangeText={setPensamento}
            multiline
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: pensamento.trim() ? '#C94A29' : '#CBD5E0' }]}
            onPress={descartarPensamento}
            disabled={!pensamento.trim()}
          >
            <Trash2 color="#FFF" size={20} />
            <Text style={styles.buttonText}>Descarregar Pensamento</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Animatable.View animation="fadeOutDown" duration={1200} style={styles.cardDescarte}>
          <Sparkles color="#38A169" size={40} />
          <Text style={styles.textDescarte}>Pensamento descartado com sucesso.</Text>
          <Text style={styles.subtextDescarte}>Sinta o alívio de deixar ir.</Text>
        </Animatable.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F7F4' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2D3748', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#718096', textAlign: 'center', marginTop: 6, marginBottom: 24 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, padding: 14, minHeight: 120, textAlignVertical: 'top', fontSize: 15, color: '#2D3748', marginBottom: 16 },
  button: { flexDirection: 'row', padding: 14, borderRadius: 10, alignItems: 'center', justifyContent: 'center', gap: 8 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  cardDescarte: { backgroundColor: '#F0FFF4', padding: 30, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#C6F6D5', marginTop: 20 },
  textDescarte: { fontSize: 18, fontWeight: 'bold', color: '#22543D', marginTop: 12 },
  subtextDescarte: { fontSize: 14, color: '#38A169', marginTop: 4 },
});