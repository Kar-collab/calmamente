import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Button, Alert } from 'react-native';
import HeaderCadastro from '../components/HeaderCadastro';
import InputCampo from '../components/InputCampo';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [cidade, setCidade] = useState(''); // Campo Adicional do Passo 5
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const handleCadastrar = () => {
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 1. Parte de identificação da tela (Componente Criado) */}
      <HeaderCadastro 
        titulo="Criar Conta 🌿" 
        subtitulo="Cadastre-se para personalizar sua experiência no CalmaMente" 
      />

      <View style={styles.form}>
        {/* 2. Parte de Dados Pessoais */}
        <InputCampo
          label="Nome Completo"
          placeholder="Digite seu nome completo"
          value={nome}
          onChangeText={setNome}
        />

        <InputCampo
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <InputCampo
          label="Telefone"
          placeholder="(00) 00000-0000"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <InputCampo
          label="Data de Nascimento"
          placeholder="DD/MM/AAAA"
          value={nascimento}
          onChangeText={setNascimento}
        />

        {/* 3. Campo Adicional Exigido no Passo 5 */}
        <InputCampo
          label="Cidade"
          placeholder="Sua cidade atual"
          value={cidade}
          onChangeText={setCidade}
        />

        {/* 4. Parte de Dados de Acesso (com secureTextEntry) */}
        <InputCampo
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />

        <InputCampo
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          secureTextEntry={true}
          value={confirmaSenha}
          onChangeText={setConfirmaSenha}
        />

        {/* 5. Botão de Ação */}
        <View style={styles.buttonContainer}>
          <Button title="Cadastrar" color="#38A169" onPress={handleCadastrar} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F7F4' },
  content: { padding: 20, paddingTop: 30, paddingBottom: 40 },
  form: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, elevation: 2 },
  buttonContainer: { marginTop: 10 },
});