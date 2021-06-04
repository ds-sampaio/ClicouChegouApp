import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'   
import { server, showError, showSuccess} from '../common'

export default function AppForm({ route, navigation }) {
  const initialUserState = {
    id_usuario: null,
    nome: "",   
    cpf: "" , 
    nome_cuidador: "",
    tel_cuidador: "",
    cpf_cuidador: "",
    email_cuidador: "",
    logradouro: "",
    bairro: "",
    numero: "",
    forma_pagamento: "",
    cidade: "",
   } 
   const id = route.params ? route.params.id : undefined;    
   const [user, setUser] = useState(initialUserState);  

    useEffect(() => {
        getData().then(user => setUser(user));
    }, []);
    
    const storeData = async (user) => {
      try {
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem('user', jsonValue)
      } catch (e) {
        // saving error
      }
    }    

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      console.warn(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : initialUserState;
    } catch(e) {
      // error reading value
    }
  }


  function SalvarDados(){
    handleButtonPress()
    storeData(user)
  }

 
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('user')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

  loadUsuario = async () => {
    try {         
        const res = await axios.get(`${server}/usucpf`)  
        setUser(res.data[0])   
    } catch(e) {
        showError(e)
    }
  }
   
  handleButtonPress = async () => {
    // const jsonValue = await AsyncStorage.getItem('user')
    // console.warn(this.state.descricao)
    // if (jsonValue === null) {
        
    // } else {
    //     console.warn('update')      
    // }   

    try {
      console.warn(user)
      await axios.post(`${server}/usuario`,{
        nome: user.nome,   
        cpf: user.cpf ,   
        nome_cuidador: user.nome_cuidador,
        tel_cuidador: user.tel_cuidador,
        cpf_cuidador: user.cpf_cuidador,
        email_cuidador:user.email_cuidador,
        logradouro: user.logradouro,
        bairro: user.bairro,
        numero: user.numero,
        forma_pagamento: 1,
        cidade: user.cidade,     
  })
      
      showSuccess('Usuario Cadastrado')
      loadUsuario()
      props.navigation.goBack()
  } catch(e){
      showError(e)
  } 
              
 } 
    
    return (
      <ScrollView>
        <View style={styles.container}>        
          <Text style={styles.title}>Usuário</Text>
          <View style={styles.inputContainer}>             
              <TextInput 
                  style={styles.input} 
                  onChangeText={nome => setUser({...user, nome})}                
                  placeholder="Nome"
                  clearButtonMode="always" 
                  value={user.nome}
              /> 
              <TextInput 
                  style={styles.input} 
                  onChangeText={cpf => setUser({...user, cpf})}                
                  placeholder="Cpf"
                  clearButtonMode="always" 
                  value={user.cpf}
              /> 
              <TextInput 
                  style={styles.input} 
                  onChangeText={nome_cuidador => setUser({...user, nome_cuidador})}                
                  placeholder="Cuidador"
                  clearButtonMode="always" 
                  value={user.nome_cuidador}
              /> 
              <TextInput 
                  style={styles.input} 
                  onChangeText={email_cuidador => setUser({...user, email_cuidador})}                
                  placeholder="E-mail"
                  clearButtonMode="always" 
                  value={user.email_cuidador}
              />
              <TextInput 
                  style={styles.input} 
                  onChangeText={tel_cuidador => setUser({...user, tel_cuidador})}                
                  placeholder="Telefone"
                  clearButtonMode="always" 
                  value={user.tel_cuidador}
              />
              <TextInput 
                  style={styles.input} 
                  onChangeText={cpf_cuidador => setUser({...user, cpf_cuidador})}                
                  placeholder="Cpf do cuidador"
                  clearButtonMode="always" 
                  value={user.cpf_cuidador}
              /> 
              <TextInput 
                  style={styles.input} 
                  onChangeText={logradouro => setUser({...user, logradouro})}                
                  placeholder="Logradouro"
                  clearButtonMode="always" 
                  value={user.logradouro}
              /> 
              <TextInput 
                  style={styles.input} 
                  onChangeText={bairro => setUser({...user, bairro})}                
                  placeholder="Bairro"
                  clearButtonMode="always" 
                  value={user.bairro}
              /> 
              <TextInput 
                  style={styles.input} 
                  onChangeText={numero => setUser({...user, numero})}                
                  placeholder="Numero"
                  clearButtonMode="always" 
                  value={user.numero}
              />                        
              {/* <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
              <Text style={styles.buttonText}>Salvar</Text> 
              </TouchableOpacity>      */}

            <TouchableOpacity
              onPress={SalvarDados}
              style={styles.button}>
              <Text style={styles.buttonText}>SALVAR VALOR</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={getData}
                style={styles.button}>
                <Text style={styles.buttonText}>LER VALOR</Text>
            </TouchableOpacity>    
            <TouchableOpacity
                onPress={removeValue}
                style={styles.button}>
                <Text style={styles.buttonText}>EXCLUIR</Text>
            </TouchableOpacity> 
              
          </View>
          <StatusBar style="light" />
        </View>
      </ScrollView>        
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#663399',
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
      borderColor: '#663399',
      borderWidth: 1,
    },
    button: {
      marginTop: 20,
      height: 60,
      backgroundColor: '#663399',
      borderBottomColor: '#663399',
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