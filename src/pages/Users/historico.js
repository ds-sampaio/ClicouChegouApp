import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'   
import { server, showError, showSuccess} from '../common'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Button, Avatar } from 'react-native-elements'
import moment from "moment";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


export default function historico (props) {
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
  
    const [user, setUser] = useState(initialUserState);  
    const [historico, setHistorico] = useState([]); 
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {        
        setRefreshing(true);
        getData().then(user => setUser(user));
        wait(2000).then(() => setRefreshing(false));
    }, []);
  
    useEffect(() => {
      getData().then(user => setUser(user));
    }, []);
  
    //pega o id usuario do asyncstorage
    const getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('user') 
        const usuarios = JSON.parse(jsonValue)
        loadHistorico(usuarios.id_usuario)
        return jsonValue != null ? JSON.parse(jsonValue) : initialUserState;            
      } catch(e) {
      }
    } 
    //puxa os dados do backend referente ao usuario logado
    const loadHistorico = async usuarioid => {
      try {
        const res = await axios.get(`${server}/lista/${usuarioid}`)   
        setHistorico(res.data)
      } catch(e) {
        setHistorico({}) 
      }
     }

     function gethistorico({ item : historico}) {  
        return ( 
            <View>                            
                <View style={[styles.Lista, {backgroundColor: '#a9a9a9'}]} key={historico.id_produtos} bottomDivider>                   
                    <ListItem.Content>
                    <ListItem.Title style={styles.texto}>{historico.datapedido}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtexto}>{historico.descricao}</ListItem.Subtitle>
                    <View style={styles.subtitleView}>  
                        <Text style={styles.ratingText}>{historico.razao_social}</Text> 
                    </View>   
                    <View style={styles.subtitleView}>                   
                        <Text style={styles.ratingText}>R${historico.preco}</Text>
                    </View>                      
                    </ListItem.Content>                                         
                </View>               
            </View>    
        )}
  
      return (         
        <View  style={styles.container}>               
             <ScrollView
               refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
            }>    
                <View style={styles.tela}>
                    <Text style={styles.cabecalho}>Histórico de Pedidos</Text>   
                </View>              
                <FlatList
                keyExtractor={historico => historico.id_produtos.toString()}
                data={historico}
                renderItem={gethistorico}
                />           
         </ScrollView>                                  
    </View>
 );
}

  const styles = StyleSheet.create({
    container:{
      flex:1,  
    },
    tela:{
        backgroundColor: '#663399',
        padding: 30,
    },
    cabecalho: {
      color: '#FFF',
      fontSize: 30,
      alignItems: 'center',
      justifyContent: 'center',   
      marginTop: 20, 
      marginLeft: 45,  
  },
    titulo: {
        color: '#FFF',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',   
        marginTop: 20,   
    },
      Lista: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
      },
      texto :{
        color: '#663399',
        fontSize: 20,
      },
      subtexto :{
        color: '#663399',
        fontSize: 20,
        marginLeft: 5,
      },
      subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
      },
      ratingImage: {
        height: 19.21,
        width: 100
      },
      ratingText: {
        fontSize: 18,   
        paddingLeft: 5,
        color: 'grey'
      }
  });