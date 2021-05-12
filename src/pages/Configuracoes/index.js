import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

export default function Configuracoes() {
 return (
   <View style={styles.container}>
       <Text>Configuração de produtos</Text>
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
  })