import React from 'react';
import {createPost, getPostsByTopic, deletePost} from '../../api/post';
import { UserContext } from './UserProvider';

export const PostsContext = React.createContext();

const PostsProvider = props => {
    
    const {userState, userFunctions} = React.useContext(UserContext);

    const initialState = [];

    const [state, dispatch] = React.useReducer(
        (prevState, action)=>{
            switch(action.type){
                case "GET":
                    return action.data
                case "ADD":
                    return [action.data, ...prevState]
                
            }
        },
        
        initialState
    )

    const postFunctions = React.useMemo(
        ()=>({
            createPost: data => {
                createPost(data)
                .then(res => {
                    if(res){
                        const obj = {
                            "User": {
                                fullName: userState.fullName,
                                avatar: userState.avatar,
                                username: userState.username,
                                id: userState.id
                            },
                            Likes: [],
                            ...res
                        }
                        
                        dispatch({type:"ADD", data: obj })
                    }
                })
            },
            getPostsByTopic: data => {
                getPostsByTopic(data)
                .then(posts => {
                    dispatch({type: "GET", data: posts})
                })
            },
            deletePost: ({id}) => {
                deletePost({id:id})
                .then(res => {
                    if(res.status === 200){
                        console.log('ree');
                        const result = [...state]
                        const index = result.findIndex(e => e.id === id)
                        if(index > -1) result.splice(index,1);
                        dispatch({type:"GET", data: result})
                    }
                })
            }
        })
    )

    return(
        <PostsContext.Provider value={{posts: state, postFunctions: postFunctions}}>
            {props.children}
        </PostsContext.Provider>
    )
}

export default PostsProvider;