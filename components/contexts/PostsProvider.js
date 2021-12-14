import React from 'react';
import {createPost, getPostsByTopic} from '../../api/post';
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
                        dispatch({type:"ADD", data: res })
                    }
                })
            },
            getPostsByTopic: data => {
                getPostsByTopic(data)
                .then(posts => {
                    dispatch({type: "GET", data: posts})
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