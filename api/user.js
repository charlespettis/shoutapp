import {Base64, env} from '../misc';
import storage from '../storage';

const proxy = `${env}user`;

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
    .catch(err => {
        console.log(err);
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
        if(token){
            storage.token = token;
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

export const editAvatar = data => {
    const formData = new FormData();
    if(data.avatar) formData.append('avatar', {type: 'image/jpeg/jpg/png', uri: data.avatar, name:'avatar'});

    return fetch(`${proxy}/editAvatar`, {
        method: "PATCH",
        body: formData,
        headers: {
            'Authorization': `Token ${storage.token}`
        }
    })
    .then(res => {
        if(res.status === 200){
            return res.json();
        } else {
            return;
        }
    })
}

export const editUserDetails = data => {
    return fetch(`${proxy}/editUserDetails`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Token ${storage.token}`,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    })
    .then(res => {
        if(res.status === 200){
            return res.json();
        } else {
            return;
        }
    })
}