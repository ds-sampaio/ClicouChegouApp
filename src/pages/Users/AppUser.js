import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Database from './Database';
import { Icon , Button} from 'react-native-elements'

export default function AppUser(props){
    function handleDeletePress(){ 
        Alert.alert(
            "Atenção",
            "Você tem certeza que deseja excluir este item?",
            [
                {
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Sim", onPress: () => {
                        Database.deleteUser(props.id)
                            .then(response => props.navigation.navigate("AppList", {id: props.id}));
                    }
                }
            ],
            { cancelable: false }
            );
    }

    async function handleEditPress(){ 
        const user = await Database.getUser(props.id);
        props.navigation.navigate("AppForm", user);
    }
    
    return (            
        <View style={styles.container}>            
            <Text style={styles.textItem}>{props.user}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.deleteButton} 
                    onPress={handleDeletePress}> 
                    <Icon name="delete" color="white" size={18} />
                </TouchableOpacity>                   
                <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={handleEditPress}> 
                    <Icon name="edit" color="white" size={18} /> 
                </TouchableOpacity>                              
            </View>           
        </View>     
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginTop: 20,
      width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: '#8b008b',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: '#8b008b',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textItem: {
        fontSize: 20,
    },   
  });