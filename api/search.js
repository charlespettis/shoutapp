import storage from "../storage";
import { env } from "../misc";
const proxy = `${env}search`

export const search = query => {
    return fetch(`${proxy}/${query}`, {
        headers: {
            'Authorization': `Token ${storage.token}`,
            'Accepts': '*/*'
        }
    })
    .then(res => {
        if(res.status === 200){
            return res.json();
        }
    })
}