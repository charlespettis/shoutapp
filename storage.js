import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    token: '',

    setToken: token => {
        storage.token = token;
        return AsyncStorage.setItem('@token', token);
    },
    getToken: () => {
        return AsyncStorage.getItem('@token');
    },
    removeToken: () => {
        storage.token = '';
        return AsyncStorage.removeItem('@token');
    },
    setBlocks: data => {
        return AsyncStorage.setItem('@blocks', JSON.stringify(data));
    },
    getBlocks: async () => {
        let blocked = await AsyncStorage.getItem('@blocks');
        if(blocked){
            return JSON.parse(blocked);
        } else return []
    }
}

export default storage;