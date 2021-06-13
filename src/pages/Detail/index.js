import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Detail() {
 return (
   <View style={styles.container}>
       <Text style={styles.font}> Em Construção... </Text>
   </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#663399',
 alignItems: 'center',
 justifyContent: 'center',
},
font: {
  color : '#FFF',
  fontSize: 25,
},
})