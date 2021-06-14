import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet , TouchableOpacity, FlatList, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Configuracoes from '../Configuracoes';
import axios from 'axios'   
import { server, showError, showSuccess} from '../common'
import { ListItem, Button, Avatar } from 'react-native-elements'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default ({route, navigation}) => {
    const [config = setConfig] = useState(route.params ? route.params : {})
    const initialUserState = {
        id_produto: null,
        id_loja: null,
        descricao: '',
        quantidade: '',
       } 
        
    
    const [produtos, setprodutos] = useState([]); 
    const [produto, setproduto] = useState(initialUserState);
    const [prods, setprods] = useState([]);  
    const [quantidade, setquantidade] = useState(''); 
    const [user, setUser] = useState({}); 

    useEffect(() => {        
        loadConfiguracoes();
      }, []);

     //pega o id usuario do asyncstorage
        const getData = async () => {
            try {
            const jsonValue = await AsyncStorage.getItem('user') 
            const usuarios = JSON.parse(jsonValue) 
            return jsonValue != null ? JSON.parse(jsonValue) : initialUserStateU;            
            } catch(e) {
            // error reading value
            }
        }  

     //puxa os dados do backend referente ao usuario logado
    const loadConfiguracoes = async () => {
        try { 
        const res = await axios.get(`${server}/listproducts`)      
        setprodutos(res.data)
        setprods(res.data)  
        // console.warn(res.data)
        getData().then(user => setUser(user));
        } catch(e) {
            showError(e)
        }
    }


    function setPesquisa(descricao){
        if (descricao !== null){
            setprods({
                prods: produtos.filter(id_produtos =>
                id_produtos.descricao.includes(descricao)
                ),
            });
            // setprodutos(prods)            
        }
        
        
    }
    const setEnvio = async (produto) => {
        try {           
            if (user.id_usuario === null){
              Alert.alert('ops,desculpe. Usuário não identificado')
            } else {         
              try {
                // console.warn(user)
                await axios.post(`${server}/configuracao`,{
                    id_produtos: produto.id_produtos, 
                    id_usuario: user.id_usuario,
                    id_loja: produto.id_loja,
                    quantidade: quantidade.quantidade

               })
                
                showSuccess('Configiração Cadastrada')
                navigation.goBack()
              } catch(e){
                  showError(e)
              } 
            }
          } catch(e) {
            // error reading value
          }
    }
  

    
    
    function getConfiguracoesItem({ item : produto}) { 
    //    console.warn(config.id_config)  navigation.goBack()
        return (   
            <TouchableOpacity onPress={() => setEnvio(produto)}>
                {/* <View>
                {
                prods.map((produto, id_produtos) => ( */}
                    <ListItem key={produto.id_produtos} bottomDivider>
                        <Avatar source={{uri: produto.imagem}} />
                        <ListItem.Content>
                            <ListItem.Title style={{color: '#000'}}>{produto.descricao}</ListItem.Title>
                            <ListItem.Subtitle style={{color: '#000'}}>{produto.preco}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
               {/* ))
                 }
            </View>     */}
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
                    onChangeText={quantidade => setquantidade({...quantidade, quantidade})}                
                    placeholder="Informe a quantidade máxima..." 
                    clearButtonMode="always"
                    value={quantidade.quantidade}
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