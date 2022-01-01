import {Base64, env} from '../misc';
import storage from '../storage';
import { Platform } from 'react-native';

const proxy = `${env}user`;

export const checkCredentials = (username, email) => {
    return fetch(`${proxy}/checkCredentials/${username}/${email}`)
}

export const createAccount = data => {
    const formData = new FormData();
    const newImageUri = Platform.OS === "android" ? "file:///" + data.avatar.split("file:/").join("") : data.avatar;
    if(data.avatar) formData.append('avatar', {type: 'image/*', uri: newImageUri, name:'avatar'});
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('fullName', data.fullName);
    formData.append('jobTitle', data.jobTitle);

    return fetch(`${proxy}/createAccount`, {
        method: 'POST',
        headers:{
            'Content-Type': 'multipart/form-data',
            'Accepts':'*/*'
        },
        body: formData
    })
    .then(res => {
        if(res.status === 200){
            return res.json();
        } else {
            alert('Something went wrong. Please try again later.')
            return res.statusText();
        }
        
    })
    .catch(err => {
        throw new Error(err);

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
    const newImageUri = Platform.OS === "android" ? "file:///" + data.avatar.split("file:/").join("") : data.avatar;
    if(data.avatar) formData.append('avatar', {type: 'image/*', uri: newImageUri, name:'avatar'});
    return fetch(`${proxy}/editAvatar`, {
        method: "PATCH",
        body: formData,
        headers: {
            'Authorization': `Token ${storage.token}`,
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(res => {
        if(res.status === 200){
            return res.json();
        } else {
            return;
        }
    })
    .catch(err => {
        console.error(err)
        throw new Error(err);
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

export const getUserDetails = id => {
    return fetch(`${proxy}/getUserDetails/${id}`,{
        headers: {'Authorization': `Token ${storage.token}`}
    })
    .then(res => {
        if(res.status = 200){
            return res.json();
        }
    })
}

export const resetPassword = ({currentPassword, newPassword}) => {
    return fetch(`${proxy}/resetPassword`, {
        method: "PATCH",
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
        }),
        headers: {
            'Authorization': `Token ${storage.token}`,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    })
    .then(res => {
        return res.status;
    })
}

export const sendFeedback = ({feedback}) => {
    return fetch(`${proxy}/sendFeedback`, {
        method: "POST",
        body: JSON.stringify({
            feedback: feedback
        }),
        headers: {
            'Authorization': `Token ${storage.token}`,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    })
    .then(res => {
        return res;
    })
}

export const getLikes = () => {
    return fetch(`${proxy}/getLikes`, {
        headers: {
            'Authorization': `Token ${storage.token}`
        }
    })
    .then(res => {
        if(res.status === 200){
            return res.json();
        }
    })
}

export const deleteAccount = () => {
    return fetch(`${proxy}/deleteAccount`, {
        method:'DELETE',
        headers: {
            'Authorization': `Token ${storage.token}`
        }
    })
    .then(res => {
        return res;
    })
}