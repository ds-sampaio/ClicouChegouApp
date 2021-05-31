import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Button } from 'react-native';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AppUser from './AppUser';
import Database from './Database';


export default function AppList({ route, navigation }) {
    const [users, setUsers] = useState([]);
  
  useEffect(() => {
      Database.getUsers().then(users => setUsers(users));
   }, [route]);

    return (
        <View style={styles.container}>                                  
            <StatusBar style="light" />
            {/* <Text style={styles.title}>Usuarios</Text> */}
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.itemsContainer}>
                { users.map(user => {
                    return <AppUser key={user.id} id={user.id} user={user.nome + ', ' +  user.cuidador + ' - ' + user.telefone + ' ' + user.cpf}  navigation={navigation}/>
                }) }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
      backgroundColor: '#8b008b',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50,
      marginBottom: 20
    },
    scrollContainer: {
      flex: 1,
      width: '90%'
    },
    itemsContainer: {
      flex: 1,
      marginTop: 10,
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
  });