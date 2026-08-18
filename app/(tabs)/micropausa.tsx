import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function MicropausaScreen() {
  const [concluido, setConcluido] = useState(false);
  const [ultimaPausa, setUltimaPausa] = useState<string | null>(null);

  const registrarPausa = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const agora = format(new Date(), "dd/MM 'às' HH:mm", { locale: ptBR });
    setUltimaPausa(agora);
    setConcluido(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pausa de Respiração</Text>
      <Text style={styles.subtitle}>Relaxe os ombros, solte o maxilar e acompanhe o círculo.</Text>

      <Animatable.View
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        duration={3500}
        style={styles.circle}
      >
        <Text style={styles.circleText}>Inspire...</Text>
        <Text style={styles.circleSubText}>Expire</Text>
      </Animatable.View>

      <TouchableOpacity style={styles.button} onPress={registrarPausa}>
        <Text style={styles.buttonText}>Concluir Pausa de 30s</Text>
      </TouchableOpacity>

      {ultimaPausa && (
        <View style={styles.historicoBox}>
          <Text style={styles.historicoText}>Última pausa realizada em: {ultimaPausa}</Text>
        </View>
      )}

      {concluido && (
        <ConfettiCannon count={50} origin={{ x: 200, y: -20 }} onAnimationEnd={() => setConcluido(false)} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F7F4' },
  content: { padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2D3748', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#718096', textAlign: 'center', marginTop: 6, marginBottom: 30 },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#C6F6D5',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  circleText: { color: '#22543D', fontSize: 20, fontWeight: 'bold' },
  circleSubText: { color: '#276749', fontSize: 14, marginTop: 4 },
  button: { backgroundColor: '#38A169', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 10, marginTop: 30, width: '100%', alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  historicoBox: { marginTop: 20, backgroundColor: '#E6FFFA', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#B2F5EA' },
  historicoText: { color: '#234E52', fontSize: 13, fontWeight: '500' },
});