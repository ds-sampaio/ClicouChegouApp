import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Detail() {
 return (
   <View style={styles.container}>
       <Text> Pagina Detalhe do produto </Text>
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