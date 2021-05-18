import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveUser(listUser){
    listUser.id = new Date().getTime();
    let savedUsers = [];
    const response = await AsyncStorage.getItem('users');
    
    if(response) savedUsers = JSON.parse(response);
    savedUsers.push(listUser);
    
    return AsyncStorage.setItem('users', JSON.stringify(savedUsers));
}

function getUsers(){
    return AsyncStorage.getItem('users')
            .then(response => {
                if(response)
                    return Promise.resolve(JSON.parse(response));
                else
                    return Promise.resolve([]);
            })
}

async function getUser(id){
    const savedUsers = await getUsers();
    return savedUsers.find(user => user.id === id);
}


async function deleteUser(id){
    let savedUsers = await getUsers();
    const index = await savedUsers.findIndex(user => user.id === id);
    savedUsers.splice(index, 1);
    return AsyncStorage.setItem('users', JSON.stringify(savedUsers));
}

async function savedUser(listUser, id){
    listUser.id = id ? id : new Date().getTime()
    const savedUsers = await getUsers();

    if(id){
        const index = await savedUsers.findIndex(user => user.id === id);
        savedUsers[index] = listUser;
    }
    else
    savedUsers.push(listUser);

    return AsyncStorage.setItem('users', JSON.stringify(savedUsers));
}


module.exports = {
    savedUser,
    getUsers,
    getUser,
    deleteUser

}