import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'   
import { server, showError, showSuccess} from '../common'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function AppForm({ route, navigation }) {
  const initialUserState = {
    id_usuario: 0,
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
    
    const storeData = async (usuario) => {
      try {
         const jsonValue = JSON.stringify(usuario)
        await AsyncStorage.setItem('user', jsonValue)
      } catch (e) {
        // saving error
      }
    }    
  
    //ler do asyncstorage
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
    handleButtonPress() // manda info para backend gravar no banco
  }

  function Delete(){
    DeleteUsuario()
    removeValue()
    setUser(initialUserState)
  }

 
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('user')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

  const DeleteUsuario = async () => {
    try {
        await axios.delete(`${server}/usuario/${user.cpf}`)
    } catch(e) {
        showError(e)
    }
}
  //metodo para puxar dados do usuario no banco e gravar no asyncstorage
  const loadUsuario = async () => {
    try {   
      const res = await axios.post(`${server}/usucpf`,{
          cpf: user.cpf
     })      
        storeData(res.data[0])  //chama rotina para gravar no asyncstorage 
    } catch(e) {
        showError(e)
    }
}
   
  const handleButtonPress = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user')
        if (jsonValue != null){
          console.warn('Update')
        } else {         
          try {
            // console.warn(user)
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
            navigation.goBack()
          } catch(e){
              showError(e)
          } 
        }
      } catch(e) {
        // error reading value
      }
   
    } 
    
    return (
      <ScrollView>        
        <View style={styles.cabecalho}>
          <View style={styles.iconBar}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.openDrawer()}>
                <Icon name='chevron-left' size={27} color='#FFF' />
            </TouchableOpacity> 
          </View>         
           <Text style={styles.title}>Usuário</Text>
        </View> 
        <View style={styles.container}>                       
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
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
                  onPress={() => Delete()}
                  style={styles.buttonDel}>
                  <Text style={styles.buttonText}>EXCLUIR</Text>
              </TouchableOpacity> 
              <TouchableOpacity
                onPress={() => SalvarDados()}
                style={styles.button}>
                <Text style={styles.buttonText}>SALVAR VALOR</Text>
              </TouchableOpacity>              
            </View>
            <TouchableOpacity
                onPress={getData}
                style={styles.button}>
                <Text style={styles.buttonText}>LER VALOR</Text>
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
      marginLeft: '20%',
    },
    inputContainer: {
      flex: 1,
      marginTop: 20,
      width: '90%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff',
      marginBottom: 55,
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
      marginLeft: '20%',
    },
    buttonDel: {
      marginTop: 20,
      height: 60,
      backgroundColor: '#663399',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,     
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ff0000',
    },
    buttonText: {
      color: '#fff',
     fontWeight: 'bold',
    },
    iconBar: {       
       top: '10%',
       backgroundColor: '#663399',
    },
    cabecalho: {
      backgroundColor: '#663399',
      flexDirection:'row',
    },
    iconButton: {       
      top: '10%',
      backgroundColor: '#663399',
      marginLeft: '15%',
   },
  });