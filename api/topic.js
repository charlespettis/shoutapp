import storage from '../storage';
import {env} from '../misc';
import {Platform} from 'react-native';

const proxy = `${env}topic`;

export const suggestTopic = data => {
    const formData = new FormData();
    const newImageUri = Platform.OS === "android" ? "file:///" + data.image.split("file:/").join("") : data.image;

    formData.append('image', {type: 'image/*', uri: newImageUri, name:'image'});
    formData.append('title', data.title);
    formData.append('category', data.category);
    if(data.sourceUrl) formData.append('sourceUrl', data.sourceUrl);
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