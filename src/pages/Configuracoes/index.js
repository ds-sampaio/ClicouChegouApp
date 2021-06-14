import React, {useContext, useState, useEffect} from 'react';
import { View,Text, StyleSheet, FlatList ,TouchableOpacity, Image, ScrollView, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'   
import { server, showError, showSuccess} from '../common'
import { ListItem, Button, Avatar, Icon } from 'react-native-elements'
import ConfigContext from '../../context/ConfigContext' 

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export default props => {
  //tentativa de usar context api, mas n funcionou
  // const { state } = useContext(ConfigContext)
  // console.warn(state.id_config)
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
  const [configuracoes, setConfiguracao] = useState([]); 
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {        
    setRefreshing(true);
    getData().then(user => setUser(user));
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getData().then(user => setUser(user));
    //esta linha abaixo faz com que a lista seja atualizada após cadastro no componente Config
    props.navigation.addListener('focus', ()=> getData().then(user => setUser(user)))
  }, []);

  //pega o id usuario do asyncstorage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user') 
      const usuarios = JSON.parse(jsonValue)
      // console.warn(usuarios)
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
      setConfiguracao(res.data)
      // console.warn(res.data)
    } catch(e) {
        // showError(e)
        setConfiguracao({})
    }
   }

   const Delete = async (configuracao) => {
    // console.warn(configuracao.id_config)
    try {
        await axios.delete(`${server}/configuracoes/${configuracao.id_config}`)
    } catch(e) {
        showError(e)
    }
   }
   
   
  //  dispatch({type: 'deleteMedico', payload: medico})
    function getActions(configuracao) {
      return (
          <>
              {/* <Button
                    onPress={() => props.navigation.navigate('ConfiguracoesCad',configuracao)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange" />}
                /> */}
               <Button  
                  onPress={() => Delete(configuracao)}
                  type="clear"
                  icon={<Icon name="delete" size={40} color="#663399" />}
              /> 
          </>
      )
  }

   function getConfiguracoesItem({ item : configuracao}) {  
     return ( 
     <View style={[styles.Lista, {backgroundColor: '#F8F8F8'}]} key={configuracao.id_config} bottomDivider>
         <Avatar  style={styles.imageIcon} tittle={configuracao.descricao} rounded source={{ uri: configuracao.imagem }}/>         
        <ListItem.Content>
        <ListItem.Title style={{color: '#000'}}>{configuracao.descricao}</ListItem.Title>
        <ListItem.Subtitle style={{color: '#000'}}>{configuracao.preco}</ListItem.Subtitle>  
        </ListItem.Content>  
        <ListItem.Chevron/>  
        <View style={{flexDirection:'row'}}>{getActions(configuracao)}</View> 
     </View>   
     
      
	    // <TouchableOpacity style={[styles.Lista, {backgroundColor: '#F8F8F8'}]} key={configuracao.id_config} bottomDivider 
      //       onPress={() => props.navigation.navigate('ConfiguracoesCad',configuracao)} >          
      // </TouchableOpacity>         
     )
   }

 return (   
   <View style={styles.container}>                
      <ScrollView
               refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
       }>  
       <FlatList
            keyExtractor={configuracao => configuracao.id_config.toString()}
            data={configuracoes}
            renderItem={getConfiguracoesItem}
        />     
      </ScrollView>  
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
iconBar: {       
  top: '10%',
  backgroundColor: '#663399',
},
cabecalho: {
 backgroundColor: '#663399',
 width: '100%',
//  flexDirection:'row',
},
})