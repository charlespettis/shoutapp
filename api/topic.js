import storage from '../storage';
import {env} from '../misc';

const proxy = `${env}topic`;

export const suggestTopic = data => {
    const formData = new FormData();
    formData.append('image', {type: 'image/jpeg/jpg/png', uri: data.image, name:'image'});
    formData.append('title', data.title);
    formData.append('category', data.category);

    return fetch(`${proxy}/suggestTopic`, {
        method: "POST",
        body: formData,
        headers: {
            'Authorization': `Token ${storage.token}`
        }
    })
}

export const getTopics = (offset,count) => {
    return fetch(`${proxy}/getTopics/${offset}/${count}`,
    {
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

export const getTopicsByCategory = (category, offset, count) => {
    return fetch (`${proxy}/getTopicsByCategory/${category}/${offset}/${count}`,{
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