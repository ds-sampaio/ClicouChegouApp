import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppForm({ route, navigation }) {
  const initialUserState = {
    nome: "",   
    cpf: "" ,
    cuidador : "",
    email: "",
    telefone: "",
    quantidade:""
   } 
   const id = route.params ? route.params.id : undefined;    
   const [user, setUser] = useState(initialUserState);  

    useEffect(() => {
        getData().then(user => setUser(user));
    }, []);
    
    const storeData = async (user) => {
      try {
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem('user', jsonValue)
      } catch (e) {
        // saving error
      }
    }    

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      console.warn(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }


  function SalvarDados(){
    storeData(user)
  }

//   removeValue = async () => {
//     try {
//       await AsyncStorage.removeItem('user')
//     } catch(e) {
//       // remove error
//     }
  
//     console.log('Done.')
//   }
  
  
    
    return (
      <View style={styles.container}>        
        {/* <Text style={styles.title}>Novo Usuário</Text> */}
        <View style={styles.inputContainer}> 
            <TextInput 
                style={styles.input} 
                onChangeText={nome => setUser({...user, nome})}                
                placeholder="Nome"
                clearButtonMode="always" 
                value={user.nome}
            /> 
            <TextInput 
                style={styles.input} 
                onChangeText={cpf => setUser({...user, cpf})}                
                placeholder="Cpf"
                clearButtonMode="always" 
                value={user.cpf}
            /> 
             <TextInput 
                style={styles.input} 
                onChangeText={cuidador => setUser({...user, cuidador})}                
                placeholder="Cuidador"
                clearButtonMode="always" 
                value={user.cuidador}
            /> 
             <TextInput 
                style={styles.input} 
                 onChangeText={email => setUser({...user, email})}                
                placeholder="E-mail"
                clearButtonMode="always" 
                value={user.email}
            />
             <TextInput 
                style={styles.input} 
                onChangeText={telefone => setUser({...user, telefone})}                
                placeholder="Telefone"
                clearButtonMode="always" 
                value={user.telefone}
            />
            {/* <TextInput 
                style={styles.input} 
                onChangeText={quantidade => setUser({...user, quantidade})}                
                placeholder="Digite a quantidade" 
                keyboardType={'numeric'}
                clearButtonMode="always" 
                value={user.quantidade.toString()}/>  */}
            {/* <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
            <Text style={styles.buttonText}>Salvar</Text> 
            </TouchableOpacity>      */}

        <TouchableOpacity
          onPress={SalvarDados}
          style={styles.button}>
          <Text style={styles.buttonText}>SALVAR VALOR</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={getData}
            style={styles.button}>
            <Text style={styles.buttonText}>LER VALOR</Text>
        </TouchableOpacity>    
        {/* <TouchableOpacity
            onPress={removeValue}
            style={styles.button}>
            <Text style={styles.buttonText}>EXCLUIR</Text>
        </TouchableOpacity>  */}
            
        </View>
        <StatusBar style="light" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8b008b',
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50,
    },
    inputContainer: {
      flex: 1,
      marginTop: 30,
      width: '90%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch',
      borderColor: '#8b008b',
      borderWidth: 1,
    },
    button: {
      marginTop: 20,
      height: 60,
      backgroundColor: '#8b008b',
      borderBottomColor: '#8b008b',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
    },
    buttonText: {
      color: '#fff',
     fontWeight: 'bold',
    },
  });