import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

type Duracao = 1 | 5 | 10;
type Fase = 'inspirar' | 'manter' | 'expirar';

const OPCOES_DURACAO: Duracao[] = [1, 5, 10];

// Técnica 4-2-6 (ciclo completo de 12 segundos)
const TEMPO_INSPIRAR = 4000;
const TEMPO_MANTER = 2000;
const TEMPO_EXPIRAR = 6000;
const ESCALA_MAXIMA = 1.8;

const TEXTO_FASE: Record<Fase, string> = {
  inspirar: 'Inspire...',
  manter: 'Mantenha...',
  expirar: 'Expire...',
};

const FASE_POR_INDICE: Fase[] = ['inspirar', 'manter', 'expirar'];

const formatarTempo = (totalSegundos: number) => {
  const min = Math.floor(totalSegundos / 60);
  const seg = totalSegundos % 60;
  return `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
};

export default function MicropausaScreen() {
  const router = useRouter();
  // Indica que, ao fim dos confetes, é preciso voltar para a tela inicial
  const voltarAoInicioRef = useRef(false);
  const [concluido, setConcluido] = useState(false); // controla os confetes
  const [ultimaPausa, setUltimaPausa] = useState<string | null>(null);

  const [duracaoSelecionada, setDuracaoSelecionada] = useState<Duracao>(1);
  const [sessaoAtiva, setSessaoAtiva] = useState(false);
  const [sessaoConcluida, setSessaoConcluida] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(60);
  const [fase, setFase] = useState<Fase>('inspirar');

  // Escala do círculo (native driver) e "fase" da respiração (JS driver, só para sincronizar o texto)
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const faseAnim = useRef(new Animated.Value(0)).current;

  const registrarPausa = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const agora = format(new Date(), "dd/MM 'às' HH:mm", { locale: ptBR });
    setUltimaPausa(agora);
    setConcluido(true);
  };

  // Botão "Concluir Pausa": registra, solta os confetes e, quando terminarem, volta ao início
  const concluirPausa = () => {
    voltarAoInicioRef.current = true;
    registrarPausa();
  };

  const aoTerminarConfetes = () => {
    setConcluido(false);
    if (voltarAoInicioRef.current) {
      voltarAoInicioRef.current = false;
      // Vai para a tela inicial (app/index.tsx)
      router.replace('/');
    }
  };
  //chamda quando a pessoa escolhe 1, 5 ou 10 minutos
  const selecionarDuracao = (minutos: Duracao) => {
    if (sessaoAtiva) return;
    Haptics.selectionAsync();
    setDuracaoSelecionada(minutos);
    setTempoRestante(minutos * 60);
    setSessaoConcluida(false);
  };

  const iniciarSessao = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSessaoConcluida(false);
    setSessaoAtiva(true);
  };

  const encerrarSessao = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSessaoAtiva(false);
    setTempoRestante(duracaoSelecionada * 60);
  };

  useEffect(() => {
    // Sessão parada: apenas devolve o círculo suavemente ao tamanho inicial
    if (!sessaoAtiva) {
      const voltar = Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      });
      voltar.start();
      return () => voltar.stop();
    }

    // ---- Sessão ativa ----
    const totalSegundos = duracaoSelecionada * 60;
    const fimEm = Date.now() + totalSegundos * 1000;

    setTempoRestante(totalSegundos);
    setFase('inspirar');
    scaleAnim.setValue(1);
    faseAnim.setValue(0);

    // O texto é atualizado pela própria animação (sem setInterval independente)
    const listenerId = faseAnim.addListener(({ value }) => {
      setFase(FASE_POR_INDICE[Math.round(value)] ?? 'inspirar');
    });

    // Marca a mudança de fase dentro da sequência (duração 0 = instantâneo)
    const marcarFase = (indice: number) =>
      Animated.timing(faseAnim, {
        toValue: indice,
        duration: 0, //não há transição gradual
        useNativeDriver: false,
      });

    const ciclo = Animated.sequence([
      marcarFase(0),
      Animated.timing(scaleAnim, {
        toValue: ESCALA_MAXIMA,
        duration: TEMPO_INSPIRAR,
        useNativeDriver: true,
      }),
      marcarFase(1),
      Animated.delay(TEMPO_MANTER), // círculo totalmente estático
      marcarFase(2),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: TEMPO_EXPIRAR,
        useNativeDriver: true,
      }),
    ]);

    const animacao = Animated.loop(ciclo);
    animacao.start();

    // Único timer: contador regressivo baseado no horário final (sem acumular atraso)
    const timer = setInterval(() => {
      const restante = Math.max(0, Math.ceil((fimEm - Date.now()) / 1000));
      setTempoRestante(restante);

      if (restante <= 0) {
        clearInterval(timer);
        setSessaoAtiva(false); // o cleanup abaixo interrompe a animação
        setSessaoConcluida(true);
        registrarPausa(); // mantém o registro, o háptico e os confetes
      }
    }, 250);
    //limpeza do contador e para a animação
    return () => {
      clearInterval(timer);
      animacao.stop();
      faseAnim.removeListener(listenerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessaoAtiva]);

  //se a sessão estiver ativa apresenta o texto atual, se não apresenta 'Pronto?'
  const textoCirculo = sessaoAtiva ? TEXTO_FASE[fase] : 'Pronto?';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pausa de Respiração</Text>
      <Text style={styles.subtitle}>
        Relaxe os ombros, solte o maxilar e acompanhe o círculo. Escolha quanto tempo você quer
        dedicar a si mesmo agora.
      </Text>

      {/* Seleção de duração */}
      <View style={styles.duracaoRow}>
        {OPCOES_DURACAO.map((minutos) => {
          const selecionado = duracaoSelecionada === minutos;
          return (
            <TouchableOpacity
              key={minutos}
              style={[
                styles.duracaoButton,
                selecionado && styles.duracaoButtonSelecionado,
                sessaoAtiva && styles.duracaoButtonDesabilitado,
              ]}
              onPress={() => selecionarDuracao(minutos)}
              disabled={sessaoAtiva}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={{ selected: selecionado, disabled: sessaoAtiva }}
            >
              <Text
                style={[styles.duracaoText, selecionado && styles.duracaoTextSelecionado]}
              >
                {minutos} {minutos === 1 ? 'minuto' : 'minutos'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Container fixo para a animação não empurrar os outros elementos */}
      <View style={styles.animationContainer}>
        <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]} />
        <Text style={styles.circleText}>{textoCirculo}</Text>
      </View>

      {/* Contador regressivo */}
      <Text style={styles.timer}>{formatarTempo(tempoRestante)}</Text>

      {sessaoConcluida && (
        <View style={styles.mensagemBox}>
          <Text style={styles.mensagemText}>
            Prática concluída 💚 Você cuidou de si agora. Perceba como seu corpo e sua mente estão
            neste momento.
          </Text>
        </View>
      )}

      {sessaoAtiva ? (
        <TouchableOpacity style={[styles.button, styles.buttonEncerrar]} onPress={encerrarSessao}>
          <Text style={styles.buttonText}>Encerrar Sessão</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={iniciarSessao}>
            <Text style={styles.buttonText}>
              {sessaoConcluida ? 'Iniciar Nova Respiração' : 'Iniciar Respiração'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSecundario]} onPress={concluirPausa}>
            <Text style={styles.buttonSecundarioText}>Concluir Pausa</Text>
          </TouchableOpacity>
        </>
      )}

      {ultimaPausa && (
        <View style={styles.historicoBox}>
          <Text style={styles.historicoText}>Última pausa realizada em: {ultimaPausa}</Text>
        </View>
      )}

      {concluido && (
        <ConfettiCannon
          count={50}
          origin={{ x: Dimensions.get('window').width / 2, y: -20 }}
          onAnimationEnd={aoTerminarConfetes}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F7F4' },
  content: { padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2D3748', textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 14, color: '#718096', textAlign: 'center', marginTop: 6, marginBottom: 24 },

  duracaoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  duracaoButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#E6FFFA',
    borderWidth: 1,
    borderColor: '#B2F5EA',
  },
  duracaoButtonSelecionado: {
    backgroundColor: '#38A169',
    borderColor: '#38A169',
  },
  duracaoButtonDesabilitado: { opacity: 0.5 },
  duracaoText: { color: '#234E52', fontSize: 14, fontWeight: '600' },
  duracaoTextSelecionado: { color: '#FFF' },

  animationContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#C6F6D5',
    position: 'absolute', // Fica atrás do texto
  },
  circleText: { color: '#22543D', fontSize: 24, fontWeight: 'bold', position: 'absolute' },

  timer: { fontSize: 36, fontWeight: 'bold', color: '#2D3748', marginBottom: 10 },

  mensagemBox: {
    marginTop: 10,
    backgroundColor: '#E6FFFA',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B2F5EA',
    width: '100%',
  },
  mensagemText: { color: '#234E52', fontSize: 14, textAlign: 'center', fontWeight: '500' },

  button: {
    backgroundColor: '#38A169',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonEncerrar: { backgroundColor: '#E53E3E' },
  buttonSecundario: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#38A169',
    marginTop: 12,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  buttonSecundarioText: { color: '#38A169', fontWeight: 'bold', fontSize: 16 },

  historicoBox: {
    marginTop: 20,
    backgroundColor: '#E6FFFA',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B2F5EA',
  },
  historicoText: { color: '#234E52', fontSize: 13, fontWeight: '500' },
});
