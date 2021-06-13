import React, {useState, useEffect} from 'react';
import {ScrollView ,View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'   
import { server, showError, showSuccess} from '../common'

import Produtos from '../../component/Produtos'
import pedidoatualizado from '../Users/pedidoatualizado'


export default function Home(props) {
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
  const [configuracoes, setConfiguracao] = useState([]); 

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


   const ConfirmaPedido = async (usuarioid) => {
    try {
       await axios.put(`${server}/confirmapedido/${usuarioid}`,{            
        confirmacao: true 
   })                
     } catch(e){
         showError(e)
     } 
   }
   
   const navigation = useNavigation();

    return (  
    <View  style={styles.container}>             
        <View style={styles.cabecalho}>                                      
              <View style={styles.iconBar}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Icon name='bars' size={27} color='#FFF' />
                </TouchableOpacity>                  
                <Text style={styles.tituloapp}>
                  <TouchableOpacity style={styles.atualiza} onPress={() => props.navigation.navigate('pedidoatualizado')}>
                        <Icon name='eye' size={35} color='#FFF' />
                  </TouchableOpacity>  
                  Clicou Chegou                 
                </Text>  
              </View>                                 
        </View>       
        
 
          <View style={styles.textContainer}>            
             <Text style={styles.text}>Produtos</Text> 
             <View style={styles.carrinho}>
              <Icon 
                name='shopping-cart'
                color='#663399'
                size={40}                
              /> 
             </View>               
          </View>
          

 
       <View style={styles.line} />
       <View style={styles.teste}>
            <TouchableOpacity onPress={() => ConfirmaPedido(user.id_usuario)}>
              <Text style={styles.textobotao}>Confirmar</Text> 
            </TouchableOpacity>  
      </View>  
       <View>            
          <View>
             <FlatList data={configuracoes}
              keyExtractor={item => `${item.id_config}`}
              numColumns={2}
              renderItem={({item}) => <Produtos {...item}  /> } 
            />               
          </View>                     
       </View>                         
    </View>    
    
   );
   

}

const styles = StyleSheet.create({
    container:{
      // flex:1,
      width: '100%',
      backgroundColor: '#fff'
    },
    header:{
      marginBottom: 8
    },
    image:{
      marginTop: '0%',  
      width: '100%'
    },
    textContainer:{
      flexDirection: 'row',
      marginVertical: '5%',
      marginHorizontal: '5%',
      marginBottom: 13,
    },
    text:{
      fontFamily: 'Anton_400Regular',
      fontSize: 26,
      marginHorizontal: '1%',
      color : '#663399',         
    },
    line:{
      borderBottomColor: '#663399',
       borderBottomWidth: 2,
      marginBottom : 1,   
    },
    carrinho:{
      flexDirection: 'row',
      left : '55%',   
      top: 3,      
      justifyContent: 'flex-end', 
    },
    titulo:{  
       marginTop: '0%',  
       width: '110%', 
      height: 110,
      backgroundColor:'#663399',  
    },
    texttitulo:{
      fontFamily: 'Anton_400Regular',
      fontSize: 26,     
      color : '#fff',
      // flexDirection: 'row',
      marginVertical: '13%',
      marginHorizontal: '30%',
      marginBottom: 13,           
    },
    tituloapp:{
      fontFamily: 'Anton_400Regular',
      fontSize: 26,     
      color : '#fff',
      // textAlign: 'center', 
      // alignItems: 'center', 
      // justifyContent: 'center', 
      // marginHorizontal: '50%',
       marginEnd: '5%',
       marginTop: '15%' ,     
    },
    Header: {
      fontSize: 28,
       color: '#fff',
      textAlign: 'center', 
      textAlignVertical: 'center',
      marginTop: '3%',
   },
   iconBar: {        
    flexDirection: 'row',
    marginHorizontal: 20,
    marginLeft: '3%',
    top: '13%',
   },
   cabecalho: {
     height: 150,
    backgroundColor: '#663399', //'#ffd700',
   },
   teste: {
     fontSize: 40,
     backgroundColor: '#FFF', //f4a460
     padding: 8,
     alignItems: 'center',
     color: '#000',
     borderColor: '#663399',
     borderRadius: 10, 
   },
   textobotao: {
    // fontFamily: 'Anton_400Regular', 
    fontSize: 40,    
    alignItems: 'center',
    color: '#663399',
  },
  atualiza:{    
    color : '#fff', 
   marginLeft: 70,
    // marginEnd: '10%',
  //  marginTop: '20%'      
  },
 
  });