import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    setToken: token => {
        return AsyncStorage.setItem('@token', token);
    },
    getToken: () => {
        return AsyncStorage.getItem('@token');
    },
    removeToken: () => {
        return AsyncStorage.removeItem('@token');
    }
}

export default storage;