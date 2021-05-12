import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Database from './Database';

export default function AppForm({ route, navigation }) {
    const id = route.params ? route.params.id : undefined;
    const [nome, setNome] = useState(''); 
    const [cpf, setCpf] = useState('');
    const [cuidador, setCuidador] = useState('');  
    const [email, setEmail] = useState(''); 
    const [telefone, setTelefone] = useState(''); 
    const [quantidade, setQuantidade] = useState('');

    useEffect(() => {
        if(!route.params) return;
        setNome(route.params.nome);
        setCpf(route.params.cpf);
        setCuidador(route.params.cuidador);
        setEmail(route.params.email);
        setTelefone(route.params.telefone);
        setQuantidade(route.params.quantidade.toString());
    }, [route])


    function handleNomeChange(nome){ setNome(nome); } 
    function handleCpfChange(cpf){ setCpf(cpf); }
    function handleCuidadorChange(cuidador){ setCuidador(cuidador); }
    function handleEmailChange(email){ setEmail(email); }
    function handleTelefoneChange(telefone){ setTelefone(telefone); }
    function handleQuantityChange(quantidade){ setQuantidade(quantidade); }
    async function handleButtonPress(){ 
        const listUser = {nome, cpf, cuidador, email, telefone, quantidade: parseInt(quantidade)};
        Database.saveUser(listUser)
          .then(response => navigation.navigate("AppList", listUser));
    }

    async function handleButtonPress(){ 
        const listUser = {nome, cpf, cuidador, email, telefone, quantidade: parseInt(quantidade)};
        Database.saveUser(listUser, id)
          .then(response => navigation.navigate("AppList", listUser));
      }
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Novo Usuário</Text>
        <View style={styles.inputContainer}> 
            <TextInput 
                style={styles.input} 
                onChangeText={handleNomeChange} 
                placeholder="Nome"
                clearButtonMode="always" 
                value={nome}
            /> 
            <TextInput 
                style={styles.input} 
                onChangeText={handleCpfChange} 
                placeholder="Cpf"
                clearButtonMode="always" 
                value={cpf}
            /> 
             <TextInput 
                style={styles.input} 
                onChangeText={handleCuidadorChange} 
                placeholder="Cuidador"
                clearButtonMode="always" 
                value={cuidador}
            /> 
             <TextInput 
                style={styles.input} 
                onChangeText={handleEmailChange} 
                placeholder="E-mail"
                clearButtonMode="always" 
                value={email}
            />
             <TextInput 
                style={styles.input} 
                onChangeText={handleTelefoneChange} 
                placeholder="Telefone"
                clearButtonMode="always" 
                value={telefone}
            />
            <TextInput 
                style={styles.input} 
                onChangeText={handleQuantityChange} 
                placeholder="Digite a quantidade" 
                keyboardType={'numeric'}
                clearButtonMode="always" 
                value={quantidade.toString()}/> 
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
            <Text style={styles.buttonText}>Salvar</Text> 
            </TouchableOpacity>         
        </View>
        <StatusBar style="light" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8b008b',
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50,
    },
    inputContainer: {
      flex: 1,
      marginTop: 30,
      width: '90%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch',
      borderColor: '#8b008b',
      borderWidth: 1,
    },
    button: {
      marginTop: 20,
      height: 60,
      backgroundColor: '#8b008b',
      borderBottomColor: '#8b008b',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
    },
    buttonText: {
      color: '#fff',
     fontWeight: 'bold',
    },
  });