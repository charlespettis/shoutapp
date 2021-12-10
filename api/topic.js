import storage from '../storage';

const proxy = `http://192.168.1.147:3000/topic`;

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

export const getTopics = count => {
    return fetch(`${proxy}/getTopics/${count}`,
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

export const getTopicsByCategory = (category, count) => {
    return fetch (`${proxy}/getTopicsByCategory/${category}/${count}`,{
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