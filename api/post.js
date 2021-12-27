import storage from '../storage';
import {env} from '../misc';

const proxy = `${env}post`;

export const createPost = ({recording, topicId}) => {
    const formData = new FormData();
    formData.append('recording', {type: 'audio/caf/mp3/wav', uri: recording, name: 'recording'});
    formData.append('topicId', topicId);

    return fetch(`${proxy}/createPost`, {
        method:"POST",
        body: formData,
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

export const getPostsByTopic = ({id, count}) => {
    return fetch(`${proxy}/getPostsByTopic/${id}/${count}`, {
        headers: {
            'Authorization': `Token ${storage.token}`
        }
    })
    .then(res => {
        return res.json();
    })
}

export const like = ({id}) => {
    return fetch(`${proxy}/like`, {
        method:"POST",
        body: JSON.stringify({
            postId: id
        }),
        headers: {
            'Authorization' : `Token ${storage.token}`,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    })
    .then(res => {
        return res.status;
    })
}

export const flag = ({id}) => {
    return fetch(`${proxy}/flag`, {
        method: "POST",
        body: JSON.stringify({
            postId: id
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

export const deletePost = ({id}) => {
    return fetch(`${proxy}/delete`, {
        method: "DELETE",
        body: JSON.stringify({
            postId: id
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

export const getPostsByUserId = ({id, count}) => {
    return fetch(`${proxy}/getPostsByUserId/${id}/${count}`, {
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