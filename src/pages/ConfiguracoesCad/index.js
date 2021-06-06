import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet , TouchableOpacity, FlatList, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Configuracoes from '../Configuracoes';
import axios from 'axios'   
import { server, showError, showSuccess} from '../common'
import { ListItem, Button, Avatar } from 'react-native-elements'
import { Alert } from 'react-native';

export default props => {

    const initialUserState = {
        id_produto: null,
        id_loja: null,
        descricao: '',
        quantidade: 0,
       } 
    
    const [produtos, setprodutos] = useState([]); 
    const [produto, setproduto] = useState(initialUserState);
    const [prods, setprods] = useState([]);  

    useEffect(() => {
        loadConfiguracoes();
      }, []);

     //puxa os dados do backend referente ao usuario logado
    const loadConfiguracoes = async () => {
        try { 
        const res = await axios.get(`${server}/listproducts`)      
        setprodutos(res.data)
        setprods(res.data)
        // console.warn(res.data)
        } catch(e) {
            showError(e)
        }
    }


    function setPesquisa(descricao){
        setprods({
            prods: produtos.filter(id_produtos =>
            id_produtos.descricao.includes(descricao)
            ),
        });
    }

    
    
    function getConfiguracoesItem({ item : produto}) { 
        return (   
            <TouchableOpacity>
                <View>
                {
                prods.map((produto, id_produtos) => (
                    <ListItem key={produto.id_produtos} bottomDivider>
                    <Avatar source={{uri: produto.imagem}} />
                    <ListItem.Content>
                        <ListItem.Title style={{color: '#000'}}>{produto.descricao}</ListItem.Title>
                        <ListItem.Subtitle style={{color: '#000'}}>{produto.preco}</ListItem.Subtitle>
                    </ListItem.Content>
                    </ListItem>
               ))
                 }
            </View>    
            </TouchableOpacity>                  
        )
      }

 
      
    return (
        <View style={styles.container}>    
            <View style={styles.header}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => console.warn('Filtrar')}>
                        <Icon name='search' size={27} color='#FFF' />              
                    </TouchableOpacity> 
                    <TextInput  
                        style={styles.input}
                        onChangeText={descricao => setPesquisa(descricao)}                
                        placeholder="Digite a descricao do produto"
                        clearButtonMode="always" 
                        // value={produto.descricao}
                    />    
                </View>                    
            </View> 
            <View>
                <TextInput  
                    style={styles.quantidade}
                    onChangeText={quantidade => setproduto({...produto, quantidade})}                
                    placeholder="Informe a quantidade máxima..." 
                    clearButtonMode="always"
                    value={produto.quantidade}
                />    
            </View>       
            <FlatList
                keyExtractor={produto => produto.id_produtos.toString()}
                data={produtos}
                renderItem={getConfiguracoesItem}
            />     
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,      
    },
    header: {
        backgroundColor: '#663399',
        height: '11%',
        flexDirection: 'row',        
    },
    titulo: {
        fontSize: 20,
        color: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '20%',
        marginTop: '13%',
    },
    iconButton: {       
        top: '14%',
        marginLeft: '7%',
     },
     input: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        marginLeft: '2%',
        borderColor: '#000',
        marginTop: '13%',
        borderWidth: 1,     
        width: '81%',   
      },
      quantidade: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        // marginLeft: '1%',
        borderColor: '#663399',
        borderWidth: 1,     
        width: '100%',  
        marginTop: '1%', 
      },
})