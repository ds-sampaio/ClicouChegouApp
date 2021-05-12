import React from 'react';
import {ScrollView ,View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

import Produtos from '../../component/Produtos'

export default function Home() {
   const navigation = useNavigation();

    return (  <View style={styles.container}>
        <View style={styles.header}>          
          <View style={styles.titulo}> 
            <Text style={styles.texttitulo}>
                Clicou Chegou
            </Text>
          </View> 
          {/* <Image
           source={require('../../assets/clicouchegou.jpg')}
           style={styles.image}
          /> */}
 
          <View style={styles.textContainer}>
             <Text style={styles.text}>Produtos</Text> 
             <View style={styles.carrinho}>
              <Icon 
                name='cart'
                type='evilicon'
                color='#8b008b'
                size={40}                
              /> 
             </View>   
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
      flex:1,
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
      color : '#8b008b',         
    },
    line:{
      borderBottomColor: '#8b008b',
      borderBottomWidth: 2,
      marginBottom : 1,   
    },
    carrinho:{
      flexDirection: 'row',
      left : 230,   
      top: 3,      
    },
    titulo:{      
       marginTop: '0%',  
       width: '110%', 
      height: 110,
      backgroundColor:'#8b008b',  
    },
    texttitulo:{
      fontFamily: 'Anton_400Regular',
      fontSize: 26,     
      color : '#FFF',
      flexDirection: 'row',
      marginVertical: '13%',
      marginHorizontal: '30%',
      marginBottom: 13,           
    },
  });