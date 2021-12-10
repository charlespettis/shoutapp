import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    token: '',

    setToken: token => {
        storage.token = token;
        return AsyncStorage.setItem('@token', token);
    },
    getToken: () => {
        return AsyncStorage.getItem('@token')
    },
    removeToken: () => {
        storage.token = '';
        return AsyncStorage.removeItem('@token');
    }
}

export default storage;