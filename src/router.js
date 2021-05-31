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

function Routes(props){

    return(   
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" >                            
                <Drawer.Screen name="Home" component={Home} 
                    options= {{
                        title: "Página Inicial"
                    }}
                /> 
                <Drawer.Screen 
                name="FormUsers" 
                component={FormUsers} 
                options= {{
                    title: "Usuários"
                }}
                /> 
                 <Drawer.Screen name="Detail" component={Detail} 
                    options= {{
                        title: "Detail"
                    }}
                />
                <Drawer.Screen name="Configuracoes" component={Configuracoes} /> 
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
        backgroundColor: '#8b008b'
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
        fontWeight: 'bold'
    }

}


export default Routes