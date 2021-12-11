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
        return res;
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