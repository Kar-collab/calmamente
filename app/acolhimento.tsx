import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Heart, RefreshCw } from 'lucide-react-native';

const MENSAGENS: Record<string, string[]> = {
  sobrecarregado: [
    "Você não precisa resolver tudo agora. Faça uma coisa de cada vez.",
    "Está tudo bem pausar. O mundo pode esperar alguns minutos.",
    "Sua produtividade não define o seu valor.",
    "Quando tudo parece urgente, pare um instante e identifique o que realmente precisa da sua atenção agora.",
    "Você pode fazer uma coisa de cada vez. Não precisa carregar todas as responsabilidades ao mesmo tempo.",
    "Respeite seus limites. Reconhecer que precisa de uma pausa também é uma forma de cuidado.",
    "Nem tudo está sob seu controle, e você não precisa assumir a responsabilidade por tudo.",
    "Está tudo bem desacelerar. Seu valor não depende de quantas coisas você consegue fazer.",
    "Permita-se reorganizar as prioridades. Algumas coisas podem esperar.",
    "Você não precisa ser forte o tempo inteiro. Também merece receber cuidado e compreensão.",
    "Respire. Tente separar os problemas em pequenas partes. Um passo de cada vez já é progresso.",
    "Não transforme uma lista de tarefas em uma medida do seu valor. Você é muito mais do que aquilo que consegue realizar."
  ],
  cansado: [
    "Descanse. Você tem feito o seu melhor e isso é o suficiente.",
    "Permita-se recarregar sem sentir culpa.",
    "O descanso também faz parte do progresso.",
    "Descansar não significa desistir. Significa reconhecer que você também precisa de cuidado.",
    "Nem todos os dias serão produtivos, e isso não diminui sua capacidade.",
    "Respeite o ritmo do seu corpo. Você não precisa acompanhar o ritmo de todo mundo.",
    "Talvez hoje você não consiga fazer tudo, e está tudo bem. Faça o que estiver ao seu alcance.",
    "Seja gentil consigo. Você provavelmente não cobraria tanto de alguém que estivesse passando pelo mesmo que você.",
    "Uma pausa não apaga seu progresso. Você continua avançando, mesmo quando precisa parar.",
    "Não confunda cansaço com incapacidade. Estar cansado não significa que você não consegue.",
    "Permita-se viver este momento sem exigir de si mesmo uma solução para tudo.",
    "Você merece momentos de tranquilidade, não apenas depois de cumprir todas as suas obrigações."
  ],
  preocupado: [
    "Respire. Este momento difícil também vai passar.",
    "Foque apenas no que você pode controlar hoje.",
    "Você já superou dias difíceis antes. Confie em você.",
    "Nem todo pensamento que aparece representa algo que realmente vai acontecer.",
    "Tente identificar: isso é algo que está acontecendo agora ou algo que você teme que aconteça?",
    "Você não precisa encontrar todas as respostas neste momento.",
    "O futuro ainda não aconteceu. Procure direcionar sua atenção para aquilo que está ao seu alcance hoje.",
    "Você pode sentir medo e, ainda assim, dar pequenos passos.",
    "Não permita que uma possibilidade negativa se transforme automaticamente em uma certeza.",
    "Pergunte a si mesmo: existe outra maneira de interpretar essa situação?",
    "Em vez de tentar controlar todos os resultados, concentre-se na próxima atitude que pode tomar.",
    "Seja paciente consigo. Nem tudo precisa ser resolvido agora, e você pode enfrentar uma situação de cada vez."
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

  content: { padding: 40, alignItems: 'center' },

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