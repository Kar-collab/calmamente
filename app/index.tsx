import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>CalmaMente 🌿</Text>
        <Text style={styles.subtitle}>Seu ajudante para momentos de ansiedade</Text>
      </View>

      <View style={styles.menu}>
        {/* BOTÃO 1: SOS Ansiedade */}
        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#E53E3E' }]} 
          onPress={() => router.push('/sos-ansiedade')}
        >
          <Text style={styles.cardTitle}>🚨 SOS Ansiedade (5-4-3-2-1)</Text>
          <Text style={styles.cardDesc}>Técnica de ancoragem rápida para quebrar a hiperativação e focar no presente.</Text>
        </TouchableOpacity>

        {/* BOTÃO 2: Micropausa */}
        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#319795' }]} 
          onPress={() => router.push('/micropausa')}
        >
          <Text style={styles.cardTitle}>🫁 Micropausa</Text>
          <Text style={styles.cardDesc}>Exercícios de respiração guiada para estimular o relaxamento físico e mental.</Text>
        </TouchableOpacity>

        {/* BOTÃO 3: Lixeira de Pensamentos */}
        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#805AD5' }]} 
          onPress={() => router.push('/descarrego')}
        >
          <Text style={styles.cardTitle}>🗑️ Lixeira de Pensamentos</Text>
          <Text style={styles.cardDesc}>Externalize e descarte pensamentos intrusivos e frustrações acumuladas.</Text>
        </TouchableOpacity>

        {/* BOTÃO 4: Cartas de Acolhimento */}
        <TouchableOpacity 
          style={[styles.card, { borderLeftColor: '#D69E2E' }]} 
          onPress={() => router.push('/acolhimento')}
        >
          <Text style={styles.cardTitle}>💌 Cartas de Acolhimento</Text>
          <Text style={styles.cardDesc}>Mensagens gentis e realistas para substituir a autocobrança por autocompaixão.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F7F4' 
  },
  content: { 
    padding: 20, 
    paddingTop: 60, 
    paddingBottom: 40 
  },
  header: { 
    marginBottom: 30,
    alignItems: 'center'
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#2D3748', 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#4A5568', 
    textAlign: 'center',
    paddingHorizontal: 10
  },
  menu: { 
    marginTop: 10 
  },
  card: { 
    backgroundColor: '#FFFFFF', 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 16, 
    elevation: 2, 
    borderLeftWidth: 5 
  },
  cardTitle: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#2D3748', 
    marginBottom: 6 
  },
  cardDesc: { 
    fontSize: 14, 
    color: '#718096', 
    lineHeight: 20 
  },
});