import React, {useState, useEffect} from 'react';
import { View,Text, StyleSheet, FlatList ,TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'   
import { server, showError, showSuccess} from '../common'
import { ListItem, Button, Icon, Avatar } from 'react-native-elements'

export default props => {
  
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
   const initialUserStateConfig = {
      id_config: null,
      id_produtos: null,
      id_usuario: null,
      id_loja: null,
      descricao: "",
      imagem: "",
      preco: 0,
      cod_barras: "" 
   } 
  const [user, setUser] = useState(initialUserState);  
  const [configuracoes, setConfig] = useState([]); 

  useEffect(() => {
    getData().then(user => setUser(user));
  }, []);

  //pega o id usuario do asyncstorage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user') 
      const usuarios = JSON.parse(jsonValue)
      loadConfiguracoes(usuarios.id_usuario)
      return jsonValue != null ? JSON.parse(jsonValue) : initialUserState;            
    } catch(e) {
      // error reading value
    }
  } 
  //puxa os dados do backend referente ao usuario logado
  const loadConfiguracoes = async usuarioid => {
    try {
      // console.warn(usuarioid)   
      const res = await axios.get(`${server}/homeusu/${usuarioid}`)      
      setConfig(res.data)
      // console.warn(res.data)
    } catch(e) {
        showError(e)
    }
   }

   function getConfiguracoesItem({ item : configuracao}) {  
     return (      
	    <TouchableOpacity style={[styles.Lista, {backgroundColor: '#F8F8F8'}]} key={configuracao.id_config} bottomDivider
        onPress={() => props.navigation.navigate('ConfiguracoesCad')} >
         <Avatar  style={styles.imageIcon} tittle={configuracao.descricao} rounded source={{ uri: configuracao.imagem }}/> 
         <ListItem.Content>
            <ListItem.Title style={{color: '#000'}}>{configuracao.descricao}</ListItem.Title>
            <ListItem.Subtitle style={{color: '#000'}}>{configuracao.preco}</ListItem.Subtitle>
         </ListItem.Content>          
      </TouchableOpacity>         
     )
   }

 return (
   <View style={styles.container}>      
       <FlatList
            keyExtractor={configuracao => configuracao.id_config.toString()}
            data={configuracoes}
            renderItem={getConfiguracoesItem}
        />     
   </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
   alignItems: 'center',
   justifyContent: 'center'
  },
  
imageIcon: {
  width: 40,
  height: 40,
  marginHorizontal: 20,
  borderRadius: 20,
  backgroundColor: "#fff",   
},
Lista: {
  marginTop: '0%',
  width: 420,
  height: 70,
  borderRadius: 2,
  marginVertical: 10,
  alignItems: 'center',
  flexDirection: 'row',
  alignContent: 'center',
},
})