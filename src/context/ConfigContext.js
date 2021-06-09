import React, { createContext, useState, useEffect, } from 'react'

const ConfigContext = createContext({})

export const ConfigProvider = props => {
    const initialUserState = {
        id_usuario: null,
        nome: "",   
        cpf: "" , 
        nome_cuidador: "",
        tel_cuidador: "",
        cpf_cuidador: "",
        email_cuidador: "",
        logradouro: "",
        bairro: "",
        numero: "",
        forma_pagamento: "",
        cidade: "",
       } 

    const [user, setUser] = useState(initialUserState);  
    const [configuracoes, setConfiguracoes] = useState([]); 

    useEffect(() => {        
        getData().then(user => setUser(user));        
      }, []);

    //pega o id usuario do asyncstorage
    const getData = async () => {
        try {        
        const jsonValue = await AsyncStorage.getItem('user') 
        const usuarios = JSON.parse(jsonValue)   
           
        loadConfiguracoes(usuarios.id_usuario)
        return jsonValue != null ? JSON.parse(jsonValue) : initialUserState;            
        } catch(e) {
        // error reading value
        }
    } 
    //puxa os dados do backend referente ao usuario logado
    const loadConfiguracoes = async usuarioid => {
        try {
        // console.warn(usuarioid)   
        const res = await axios.get(`${server}/homeusu/${usuarioid}`)      
        setConfiguracoes(res.data)
        // console.warn(res.data)
        } catch(e) {
            showError(e)
        }
    }


    return (
       <ConfigContext.Provider value={{
           state: {
            configuracoes
           }
       }}>
           {props.children}
       </ConfigContext.Provider> 
    )
}

export default ConfigContext