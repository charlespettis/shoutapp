import storage from '../storage';
import {env} from '../misc';

const proxy = `${env}admin`;

export const getTopicsAwaitingApproval = () => {
    return fetch(`${proxy}/getTopicsAwaitingApproval/20`, {
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

export const approveTopic = ({id}) => {
    return fetch(`${proxy}/approveTopic`, {
        method:"PATCH",
        body: JSON.stringify({
            id: id
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