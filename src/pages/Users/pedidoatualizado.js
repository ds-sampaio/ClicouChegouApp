import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'   
import { server, showError, showSuccess} from '../common'
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


export default function pedidoatualizado (props) {
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
    const [atualizacoes, setAtualizacoes] = useState([]); 
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
        loadAtualizacoes(usuarios.id_usuario)
        return jsonValue != null ? JSON.parse(jsonValue) : initialUserState;            
      } catch(e) {
      }
    } 
    //puxa os dados do backend referente ao usuario logado
    const loadAtualizacoes = async usuarioid => {
      try {
        const res = await axios.get(`${server}/atualizacao/${usuarioid}`)   
        setAtualizacoes(res.data[0])
        // console.warn(res.data)
      } catch(e) {
        setAtualizacoes({}) 
      }
     }
  
      return ( 
        
        <View  style={styles.container}> 
        <ScrollView
               refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
            }>    
            <View>             
                <View style={styles.tela}>
                <Text style={styles.titulo}>Ultimo pedido</Text>   
                </View>             
                <View style={styles.info}>
                    <View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.titulo}>Nº do Pedido: 000</Text>
                            <Text style={styles.titulo}>{atualizacoes.id_pedido}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.titulo}>Total: R$</Text>
                            <Text style={styles.titulo}>{atualizacoes.preco}</Text> 
                        </View> 
                        <Image 
                            source={{
                                uri: atualizacoes.url ,
                            }}
                            style={styles.produtoImg}
                        /> 
                    </View>                                        
                </View>               
            </View>  
        </ScrollView>                                 
    </View>
         
      
     );
     
  
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,   
    //   backgroundColor: '#663399',   
    },
    tela:{
        // marginTop: '20%',
        backgroundColor: '#663399',
        padding: 30,
        // marginVertical: 8,
        // marginHorizontal: 16,
        // borderRadius: 10,
    },
    titulo: {
        color: '#FFF',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',   
        marginTop: 20,    
        left: '25%',
    },
    info:{
        // marginTop: '20%',
        backgroundColor: '#f4a460',
        padding: 30,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    produtoImg:{
        // left: 30,
        width: 300,
        height: 275,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode : 'contain',
    },
  });