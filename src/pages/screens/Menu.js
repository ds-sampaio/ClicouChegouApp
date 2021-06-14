import React, {useState, useEffect} from 'react'
import { Platform, ScrollView, View, Text, StyleSheet, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios'
import { BackHandler } from 'react-native';

export default props => {
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
    const [user, setUser] = useState(initialUserState);     
     
    useEffect(() => {
        getData().then(user => setUser(user));
    }, []);


       //ler do asyncstorage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user') 
    //   console.warn(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : initialUserState;            
    } catch(e) {
      // error reading value
    }
  } 
    
    return (

        <DrawerContentScrollView>
            <View style={styles.header}> 
                <View style={styles.title}>
                    <Text style={styles.desc} >Ola,</Text>
                    <Text style={styles.desc}>{user.nome}</Text>  
                </View>                              
                <Image 
                    source={{
                        uri: 'https://th.bing.com/th/id/Ra90271425e0835c0c8e696720f01a32c?rik=4LFMTPBfjFE0fg&riu=http%3a%2f%2fwww.medinacapital.com%2fwp-content%2fuploads%2f2016%2f05%2ficon-person.jpg&ehk=b%2fzv0tPp23mvlxbk235xG2jwd1O7%2fXI0MLXWpYFLJEY%3d&risl=&pid=ImgRaw' ,
                    }}
                    style={styles.produtoImg}
                />   
                {/* <View style={styles.userInfo}>
                    <Text style={styles.name}>
                        {props.razao_social}
                    </Text>
                    <Text style={styles.email}>
                        {props.email}
                    </Text>
                </View>               */}
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    title: {
        color: '#663399',
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10,
        // backgroundColor: '#663399',
    },
    avatar: {
        width:50, height:50, borderWidth:3,
        borderColor:'white', borderRadius:50,
        left: 10,
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        fontSize: 20,
        marginBottom: 5,
        color: '#663399',
    },
    email: {
        fontSize: 15,
        marginBottom: 10,
        color: '#663399',
    },
    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10
    },
    desconectar: {        
        fontSize: 12,        
        marginBottom: 10,
        color: '#663399',
    },
    produtoImg:{
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode : 'contain',
        marginLeft: 5,
    },
    desc: {
        color: '#663399',
        fontSize: 25,
    },
})