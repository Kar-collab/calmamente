import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Wind, PauseCircle, Trash2, Heart, Sparkles } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function MenuScreen() {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route as any);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Cabeçalho de Boas-Vindas */}
      <View style={styles.header}>
        <Text style={styles.title}>CalmaMente 🌿</Text>
        <Text style={styles.subtitle}>
          Um pequeno espaço para você respirar, desacelerar e se acolher.
        </Text>
      </View>

      {/* Grid de Cards Interativos */}
      <View style={styles.menuGrid}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: '#319795' }]}
          onPress={() => handleNavigate('/sos-ansiedade')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#E6FFFA' }]}>
            <Wind color="#319795" size={28} />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>SOS Ansiedade</Text>
            <Text style={styles.cardDescription}>Encontre seu ponto de apoio (Método 5-4-3-2-1)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { borderLeftColor: '#38A169' }]}
          onPress={() => handleNavigate('/micropausa')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#F0FFF4' }]}>
            <PauseCircle color="#38A169" size={28} />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Micropausa</Text>
            <Text style={styles.cardDescription}>Pare por 30 segundos e respire</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { borderLeftColor: '#C94A29' }]}
          onPress={() => handleNavigate('/descarrego')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#FFF5F5' }]}>
            <Trash2 color="#C94A29" size={28} />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Descarrego</Text>
            <Text style={styles.cardDescription}>Deixe um pensamento pesado ir embora</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { borderLeftColor: '#D69E2E' }]}
          onPress={() => handleNavigate('/acolhimento')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#FEFCBF' }]}>
            <Heart color="#D69E2E" size={28} />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Acolhimento</Text>
            <Text style={styles.cardDescription}>Uma mensagem gentil para este momento</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Seção Obrigatória de Tecnologias */}
      <View style={styles.techSection}>
        <View style={styles.techHeader}>
          <Sparkles color="#2C5282" size={20} />
          <Text style={styles.techTitle}>Tecnologias Utilizadas</Text>
        </View>
        <Text style={styles.techItem}>• lucide-react-native (Ícones)</Text>
        <Text style={styles.techItem}>• expo-haptics (Resposta Tátil)</Text>
        <Text style={styles.techItem}>• react-native-animatable (Animações de Respiração)</Text>
        <Text style={styles.techItem}>• date-fns (Registro de Horário)</Text>
        <Text style={styles.techItem}>• react-native-confetti-cannon (Efeito Visual)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F7F4' },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  header: { marginBottom: 28, alignItems: 'center' },
  title: { fontSize: 30, fontWeight: 'bold', color: '#2D3748', textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#718096', textAlign: 'center', marginTop: 6, lineHeight: 22 },
  menuGrid: { gap: 16, marginBottom: 30 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: { padding: 12, borderRadius: 12, marginRight: 14 },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748' },
  cardDescription: { fontSize: 13, color: '#718096', marginTop: 2 },
  techSection: { backgroundColor: '#EBF8FF', padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#BEE3F8' },
  techHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  techTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C5282' },
  techItem: { fontSize: 13, color: '#2B6CB0', marginTop: 2 },
});