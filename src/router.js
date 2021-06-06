import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
// import { NavigationContainer } from '@react-navigation/native';
 import {  createStackNavigator } from '@react-navigation/stack';
// import { createAppContainer } from 'rect-navigation';
// import { createDrawernavigation } from 'react-navigation-drawer';
import { Button, Icon } from 'react-native-elements'

import Home from './pages/Home';
import Detail from './pages/Detail';
import Configuracoes from './pages/Configuracoes';
import AppList from './pages/Users/AppList';
import AppForm from './pages/Users/AppForm';
import AppFormInicial from './pages/Users/AppFormInicial';
import ConfiguracoesCad from './pages/ConfiguracoesCad';



const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

   
  function FormUsers(props) {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
         {/* <Stack.Screen name="AppList" component={AppList} options={{ headerShown: false }} />  */}
           <Stack.Screen 
            name="AppList" 
            component={AppList} 
            options= {({ navigation }) => {
                return {
                    title: "Usuário",
                    headerRight: () => (
                        <Button 
                             onPress={() => navigation.navigate("AppForm")}
                            type= "clear"
                            icon={<Icon name="add" size={25} color="white" />}
                        />
                    )
                }
            }            
            }
          />   
         <Stack.Screen name="AppForm" component={AppForm} options={{ headerShown: false }} />         
      </Stack.Navigator>
    );
  }

  function FormConfiguracoes(props) {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
           <Stack.Screen 
                name="Configuracoes" 
                component={Configuracoes} 
                options= {({ navigation }) => {
                    return {
                        title: "Configuracões",
                        headerRight: () => (
                            <Button 
                                onPress={() => navigation.navigate("ConfiguracoesCad")}
                                type= "clear"
                                icon={<Icon name="add" size={25} color="white" />}
                            />
                    )
                }
            }            
            }
          />   
         <Stack.Screen name="ConfiguracoesCad" component={ConfiguracoesCad} options={{ headerShown: false }} />         
      </Stack.Navigator>
    );
  }


function Routes(props){

    return(   
        <NavigationContainer>
            <Drawer.Navigator getData >                            
                <Drawer.Screen name="Home" component={Home} 
                    options= {{
                        title: "Página Inicial"
                    }}
                /> 
                 <Drawer.Screen name="Detail" component={Detail} 
                    options= {{
                        title: "Detail"
                    }}
                 />
                <Drawer.Screen name="Configuracoes" component={FormConfiguracoes} /> 
                <Drawer.Screen name="AppFormInicial" component={AppFormInicial} 
                    options= {{
                        title: "Usuario Login"
                    }}
                />                                              
            </Drawer.Navigator>           
            {/* <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home} //componente que vai ser redenrizado nessa tela
                    options={{ headerShown: false }} //tira o cabeçalho da tela
                />
                <Stack.Screen
                    name="Detail"
                    component={Detail} //componente que vai ser redenrizado nessa tela                    
                />
            </Stack.Navigator>              */}
        </NavigationContainer>
    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#663399'
    },
    headerTintColor: '#FFF',
    headerTitleStyle:{
        fontWeight: 'bold'
    }

}

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      console.warn(jsonValue)
      return jsonValue != null ? initialRouteName="Home" : initialRouteName="AppFormInicial";
    } catch(e) {
      // error reading value
    }
  }


export default Routes