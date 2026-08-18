import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Heart, RefreshCw } from 'lucide-react-native';

const MENSAGENS: Record<string, string[]> = {
  sobrecarregado: [
    "Você não precisa resolver tudo agora. Faça uma coisa de cada vez.",
    "Está tudo bem pausar. O mundo pode esperar alguns minutos.",
    "Sua produtividade não define o seu valor."
  ],
  cansado: [
    "Descanse. Você tem feito o seu melhor e isso é o suficiente.",
    "Permita-se recarregar sem sentir culpa.",
    "O descanso também faz parte do progresso."
  ],
  preocupado: [
    "Respire. Este momento difícil também vai passar.",
    "Foque apenas no que você pode controlar hoje.",
    "Você já superou dias difíceis antes. Confie em você."
  ]
};

export default function AcolhimentoScreen() {
  const [categoria, setCategoria] = useState('sobrecarregado');
  const [mensagemIndex, setMensagemIndex] = useState(0);

  const novaMensagem = (cat: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCategoria(cat);
    const msgs = MENSAGENS[cat];
    const proximoIndex = (mensagemIndex + 1) % msgs.length;
    setMensagemIndex(proximoIndex);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cartas de Acolhimento</Text>
      <Text style={styles.subtitle}>Como você está se sentindo agora?</Text>

      <View style={styles.filtros}>
        <TouchableOpacity
          style={[styles.chip, categoria === 'sobrecarregado' && styles.chipAtivo]}
          onPress={() => novaMensagem('sobrecarregado')}
        >
          <Text style={[styles.chipText, categoria === 'sobrecarregado' && styles.chipTextAtivo]}>Sobrecarregado(a)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, categoria === 'cansado' && styles.chipAtivo]}
          onPress={() => novaMensagem('cansado')}
        >
          <Text style={[styles.chipText, categoria === 'cansado' && styles.chipTextAtivo]}>Cansado(a)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, categoria === 'preocupado' && styles.chipAtivo]}
          onPress={() => novaMensagem('preocupado')}
        >
          <Text style={[styles.chipText, categoria === 'preocupado' && styles.chipTextAtivo]}>Preocupado(a)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.carta}>
        <Heart color="#D69E2E" size={32} style={{ alignSelf: 'center', marginBottom: 16 }} />
        <Text style={styles.mensagemText}>"{MENSAGENS[categoria][mensagemIndex]}"</Text>
      </View>

      <TouchableOpacity style={styles.btnOutra} onPress={() => novaMensagem(categoria)}>
        <RefreshCw color="#4A5568" size={18} />
        <Text style={styles.btnOutraText}>Sorteiar outra mensagem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F7F4' },
  content: { padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2D3748', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#718096', textAlign: 'center', marginTop: 6, marginBottom: 20 },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#E2E8F0' },
  chipAtivo: { backgroundColor: '#D69E2E' },
  chipText: { color: '#4A5568', fontSize: 13, fontWeight: '600' },
  chipTextAtivo: { color: '#FFF' },
  carta: { backgroundColor: '#FEFCBF', width: '100%', padding: 30, borderRadius: 16, borderLeftWidth: 6, borderLeftColor: '#D69E2E', elevation: 2 },
  mensagemText: { fontSize: 18, color: '#744210', fontStyle: 'italic', textAlign: 'center', lineHeight: 26 },
  btnOutra: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, padding: 12 },
  btnOutraText: { color: '#4A5568', fontWeight: '600', fontSize: 14 },
});