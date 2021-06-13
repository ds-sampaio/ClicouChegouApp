import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements'
import axios from 'axios'   
import { server, showError, showSuccess} from '../../pages/common'

export default function Produtos(props) {
    function filterDesc(desc){
        if(desc.length < 27){
            return desc;
        }   
    
        return `$desc.substring(0, 23)...`;
     }

     const handleButtonPress = async () => {
     try {
        await axios.post(`${server}/novopedido`,{            
            id_loja: props.id_loja,
            id_cliente: props.id_usuario,
            id_produtos : props.id_produtos,
            status : 'solicitado',   
       })        
      } catch(e){
          showError(e)
      } 
    }


    return (
        // onPress={props.onClick}    
    <TouchableOpacity style={styles.container} onPress={() => handleButtonPress()}>
         <Image 
            source={{
                uri: props.imagem ,
              }}
            style={styles.produtoImg}
        />        
        <Text style={styles.produtoText}>
             {filterDesc(props.descricao)}
        </Text>
        <View opacity={0.4} >
            <Text style={styles.produtoText}>{props.preco}</Text>
        </View>    
        {/* <Image
            source={props.img}
            style={styles.produtoImg}
        />
        <Text style={styles.produtoText}>
             {filterDesc(props.children)}
        </Text>
        <View opacity={0.4} >
            <Text style={styles.produtoText}>{props.cost}</Text>
        </View>        */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '3%'
    },
    produtoImg:{
        // left: 30,
        width: 175,
        height: 175,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode : 'contain',
    },
    produtoText:{
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center'
        // left: 30
    }

})