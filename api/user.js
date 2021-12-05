import {Base64} from '../misc';
import storage from '../storage';

const proxy = `http://192.168.1.147:3000/user`;

export const checkCredentials = (username, email) => {
    return fetch(`${proxy}/checkCredentials/${username}/${email}`)
}

export const createAccount = data => {
    const formData = new FormData();
    if(data.avatar) formData.append('avatar', {type: 'image/jpeg/jpg/png', uri: data.avatar, name:'avatar'});
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('fullName', data.fullName);
    formData.append('jobTitle', data.jobTitle);

    return fetch(`${proxy}/createAccount`, {
        method: 'POST',
        body: formData
    })
    .then(res => {
        if(res.status === 200){
            return res.json();
        } else {
            alert('Something went wrong. Please try again later.')
            return;
        }
    })
}

export const login = data => {
    const encoded = Base64.encode(data);

    return fetch(`${proxy}/login`, {
        method:"GET",
        headers: {
            'Authorization': `Token ${encoded}`
        }
    })
    .then(res => {
        if(res.status === 200){
            return res.json();
        } else {
            alert('Something went wrong. Please try again later.')
        }
    })
}

export const verify = () => {
    return storage.getToken()
    .then(token => {
        console.log(token);
        if(token){
            return fetch(`${proxy}/verify`, {
                method: "GET",
                headers:{
                    'Authorization': `Token ${token}`
                }
            })
            .then(res => {
                if(res.status === 200){
                    return res.json();
                }
            })
        } else {
            return;
        }
    })
}