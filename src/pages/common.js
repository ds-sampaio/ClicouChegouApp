import { Alert, Platform } from 'react-native'

const server = Platform.OS !== 'ios'
  ? 'http://192.168.0.107:3000' : 'http://192.168.0.107:3000'


function showError(err) {
    Alert.alert('Opa! Ocorreu um Problema!', `Mensagem: ${err}`)
}  

function showSuccess(msg) {
    Alert.alert('Sucesso', msg)
}

export { server, showError, showSuccess}