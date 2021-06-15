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
import { ConfigProvider } from './context/ConfigContext'
import pedidoatualizado from './pages/Users/pedidoatualizado';
import historico from './pages/Users/historico';


import Menu from './pages/screens/Menu'

const menuConfig = {
    initialRoutName: 'Home',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontWeight: 'normal',
            fontsize: 20,
            backgroundColor: '#FFF',
        },
        activeLabelStyle: {
            color: '#080',
            fontWeight: 'bold',

        }
    }
}



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
         <Stack.Screen name="pedidoatualizado" component={pedidoatualizado} options={{ headerShown: false }} /> 
         <Stack.Screen name="historico" component={historico} options={{ headerShown: false }} />        
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
                        ),
                        headerLeft: () => (
                            <Button 
                              onPress={() => navigation.goBack(null)} 
                              type= "clear"
                              icon={<Icon name='chevron-left' size={35} color='white' />}
                            />
                        ),
                    
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
       <ConfigProvider>
            <NavigationContainer>
            <Drawer.Navigator getData drawerContentOptions={menuConfig} drawerContent={(props) => <Menu {...props}/>}>                            
                <Drawer.Screen name="Home" component={Home} 
                    options= {{
                        title: "Página Inicial"
                    }}
                /> 
                <Drawer.Screen name="AppFormInicial" component={AppFormInicial} 
                    options= {{
                        title: "Usuário"
                    }}
                />  
                <Drawer.Screen name="Configuracoes" component={FormConfiguracoes}
                    options= {{
                        title: "Configurações"
                    }}                
                /> 
                {/* <Drawer.Screen name="Detail" component={Detail} 
                    options= {{
                        title: "Compras"
                    }}
                 />                  */}
                 <Drawer.Screen name="historico" component={historico} 
                    options= {{
                        title: "Histórico de Pedidos"
                    }}
                 />
                 <Drawer.Screen name="pedidoatualizado" component={pedidoatualizado} 
                    options= {{
                        title: "Pedido Atualizado"
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
       </ConfigProvider>      
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