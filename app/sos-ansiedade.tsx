import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { CheckCircle2, Eye, Hand, Smile, Utensils, Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const ETAPAS = [
  { id: 5, titulo: '5 coisas que você VÊ', desc: 'Olhe ao redor e observe 5 detalhes do seu ambiente.', icon: Eye, color: '#319795' },
  { id: 4, titulo: '4 coisas que pode TOCAR', desc: 'Sinta a textura da sua roupa, mesa ou pés no chão.', icon: Hand, color: '#2B6CB0' },
  { id: 3, titulo: '3 sons que pode OUVR', desc: 'Preste atenção nos sons distantes ou próximos.', icon: Volume2, color: '#805AD5' },
  { id: 2, titulo: '2 coisas que pode CHEIRAR', desc: 'Tente perceber o cheiro do ar ou de algo perto.', icon: Smile, color: '#DD6B20' },
  { id: 1, titulo: '1 coisa que pode SABOREAR', desc: 'Note o gosto na sua boca ou tome um gole d’água.', icon: Utensils, color: '#E53E3E' },
];

export default function SosAnsiedadeScreen() {
  const [etapaAtual, setEtapaAtual] = useState(0);

    const [concluido, setConcluido] = useState(false); // controla os confetes
    const router = useRouter();

  //Botão "Concluído, próximo"
  const avançarEtapa = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); //produz uma vibração quando a pessoa toca o botão
    if (etapaAtual < ETAPAS.length) {
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const etapa = ETAPAS[etapaAtual];

  const registrarPausa = () => {
  setConcluido(true);
  };

    // Botão "Concluir": registra, solta os confetes e, quando terminarem, volta ao início

  const concluirPausa = () => {
    registrarPausa();
  };

  const aoTerminarConfetes = () => {
    setConcluido(false); //desativa o estado dos confetes
      router.replace('/'); //navega para a tela inicial do aplicativo
    }

  
    return (
      <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {etapaAtual < ETAPAS.length ? (
        <View style={styles.card}>
          <View style={[styles.iconWrapper, { backgroundColor: `${etapa.color}15` }]}>
            <etapa.icon size={48} color={etapa.color} />
          </View>

          <Text style={[styles.numeroEtapa, { color: etapa.color }]}>{etapa.id}</Text>
          <Text style={styles.tituloEtapa}>{etapa.titulo}</Text>
          <Text style={styles.descEtapa}>{etapa.desc}</Text>

          <TouchableOpacity style={[styles.btnProximo, { backgroundColor: etapa.color }]} onPress={avançarEtapa}>
            <Text style={styles.btnText}>Concluído, próximo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cardSucesso}>
          <CheckCircle2 size={64} color="#38A169" />
          <Text style={styles.tituloSucesso}>Você está seguro(a) agora.</Text>
          <Text style={styles.descSucesso}>Você se conectou com o presente. Seu corpo está aqui e seguro.</Text>
          <TouchableOpacity style={styles.btnReiniciar} onPress={() => setEtapaAtual(0)}>
            <Text style={styles.btnReiniciarText}>Fazer novamente</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.btnConcluir}
          onPress={concluirPausa}
          >
          <Text style={styles.btnConcluirText}>Concluir</Text>
          </TouchableOpacity>
        </View>
            )}
    </ScrollView>

    {concluido && (
      <ConfettiCannon
        count={120}
        origin={{ x: 0, y: 0 }}
        autoStart //incia a animação automaticamente
        fadeOut // Faz os confetes desaparecerem gradualmente
        onAnimationEnd={aoTerminarConfetes} //executa uma função quando a animação temina
      />
    )}
  </View>
);

}

const styles = StyleSheet.create({
  
  container: { flex: 1, backgroundColor: '#F0F7F4' },
  
  content: { padding: 20, paddingTop: 30 },
  
  card: { backgroundColor: '#FFF', padding: 24, 
  borderRadius: 16, alignItems: 'center', elevation: 2 },
  
  iconWrapper: { padding: 20, borderRadius: 50, marginBottom: 16 },
  
  numeroEtapa: { fontSize: 36, fontWeight: 'bold' },
  
  tituloEtapa: { fontSize: 20, fontWeight: 'bold', color: '#2D3748', marginTop: 4, textAlign: 'center' },

  descEtapa: { fontSize: 15, color: '#718096', textAlign: 'center', marginTop: 8, lineHeight: 22, marginBottom: 24 },

  btnProximo: { width: '100%', padding: 14, borderRadius: 10, alignItems: 'center' },

  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  cardSucesso: { backgroundColor: '#FFF', padding: 30, borderRadius: 16, alignItems: 'center', elevation: 2 },

  tituloSucesso: { fontSize: 22, fontWeight: 'bold', color: '#2D3748', marginTop: 16 },

  descSucesso: { fontSize: 15, color: '#718096', textAlign: 'center', marginTop: 8, lineHeight: 22, marginBottom: 24 },

  btnReiniciar: { backgroundColor: '#E2E8F0', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnReiniciarText: { color: '#4A5568', fontWeight: 'bold' },

  btnConcluir: {
  backgroundColor: '#38A169',
  padding: 12,
  borderRadius: 8,
  width: '100%',
  alignItems: 'center',
  marginTop: 12,
},

btnConcluirText: {
  color: '#FFF',
  fontWeight: 'bold',
},
});