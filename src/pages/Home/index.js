import React from 'react';
import {ScrollView ,View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
// import {Header,Left,Right} from 'native-base'

import Produtos from '../../component/Produtos'


export default function Home(props) {
   const navigation = useNavigation();

    return (  
    <View  style={styles.container}>             
        <View style={styles.cabecalho}>                        
              <View style={styles.iconBar}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Icon name='bars' size={27} color='#FFF' />
                </TouchableOpacity>
              </View> 
              <Text style={styles.tituloapp}>
                Clicou Chegou                 
              </Text>                         
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
 
       <ScrollView>
           <View style={{ flexDirection: 'row', justifyContent: 'space-aroud' }}>
            <Produtos img={require('../../assets/1.png')} cost="R$75,90" onClick={() => navigation.navigate('Detail')}> 
                Gás
            </Produtos>
            <Produtos img={require('../../assets/2.png')} cost="R$5,00" onClick={() => navigation.navigate('Detail')}> 
                Água
            </Produtos> 
           </View>   

           <View style={{ flexDirection: 'row', justifyContent: 'space-aroud' }}>
            <Produtos img={require('../../assets/3.png')} cost="R$11,90" onClick={() => alert('Álcool adionado no carrinho')}>  
                Álcool em Gel
            </Produtos>
            <Produtos img={require('../../assets/4.png')} cost="R$2,00" onClick={() => alert('Máscara adionado no carrinho')}> 
                Máscara descartavel
            </Produtos> 
           </View>   

           <View style={{ flexDirection: 'row', justifyContent: 'space-aroud' }}>
            <Produtos img={require('../../assets/5.png')} cost="R$100,90" onClick={() => alert('Cesta Básica adionado no carrinho')}> 
                Cesta Básica
            </Produtos>
            <Produtos img={require('../../assets/6.png')} cost="R$15,00" onClick={() => alert('Sorvete adionado no carrinho')}> 
                Sorvete Sabor Napolitano
            </Produtos> 
           </View>    

       </ScrollView>
 
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
      flexDirection: 'row',
      marginVertical: '13%',
      marginHorizontal: '30%',
      marginBottom: 13,           
    },
    tituloapp:{
      fontFamily: 'Anton_400Regular',
      fontSize: 26,     
      color : '#fff',
      textAlign: 'center', 
      alignItems: 'center', 
      justifyContent: 'center', 
      marginHorizontal: '50%',
      marginEnd: '5%',
      marginTop: '15%'      
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
}
  });