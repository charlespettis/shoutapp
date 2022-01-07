import React from 'react';
import {createPost, getPostsByTopic, deletePost} from '../../api/post';
import { UserContext } from './UserProvider';
import { useToast, Box } from 'native-base';

export const PostsContext = React.createContext();

const PostsProvider = props => {

    const {userState, userFunctions} = React.useContext(UserContext);
    const toast = useToast()
    const initialState = [];

    const [state, dispatch] = React.useReducer(
        (prevState, action)=>{
            switch(action.type){
                case "GET":
                    return action.data
                case "ADD":
                    return [action.data, ...prevState]
                case "GETMORE":
                    return [...prevState, ...action.data]
                
            }
        },
        
        initialState
    )

    const postFunctions = React.useMemo(
        ()=>({
            createPost: data => {
                toast.show(PROCESSING_UPLOAD)
                createPost(data)
                .then(data => {
                    if(data){
                        const obj = {
                            "User": {
                                ...userState
                            },
                            Likes: [],
                            ...data
                        }
                        toast.show(SUCCESSFULLY_UPLOADED)
        
                        dispatch({type:"ADD", data: obj })
                    } else {
                        toast.show(ERROR_UPLOADING)
        
                    }
                })
            },
            getPostsByTopic: data => {
                getPostsByTopic(data)
                .then(posts => {
                    if(posts){
                        dispatch({type: "GET", data: posts})
                    }
                })
            },
            getMoreTopics: data => {
                getPostsByTopic(data)
                .then(posts => {
                    if(posts){
                        dispatch({type:"GETMORE", data: posts});
                    }
                })
            },
            deletePost: ({id}) => {
                deletePost({id:id})
                .then(res => {
                    if(res.status === 200){
                        const result = [...state]
                        const index = result.findIndex(e => e.id === id)
                        if(index > -1) result.splice(index,1);
                        dispatch({type:"GET", data: result})
                    }
                })
            },
            like: data => {
                let result = [...state];
                let index = result.findIndex(e => e.id === data.id);
                result[index]['Likes'].push({UserId: userState.id})
                dispatch({type:'GET', data: result})
                
            },
            unlike: data => {
                let result = [...state];
                let index = result.findIndex(e => e.id === data.id);
                if(index > -1) {
                    result[index]['Likes']=[];
                    dispatch({type:'GET', data: result})
                }
            }
        })
    )

    return(
        <PostsContext.Provider value={{posts: state, postFunctions: postFunctions}}>
            {props.children}
        </PostsContext.Provider>
    )
}

const PROCESSING_UPLOAD = {
    render: () => {
        return(
        <Box bg={'orange.500'} px="2" py="1" rounded="sm" mb={5}>
            Processing Upload!
        </Box>

        )
    }
}

const SUCCESSFULLY_UPLOADED = {
    render: () => {
        return(
        <Box bg={'emerald.500'} px="2" py="1" rounded="sm" mb={5}>
            Successfully Uploaded!
        </Box>

        )
    }
}

const ERROR_UPLOADING = {
    render: () => {
        return(
        <Box bg={'red.500'} px="2" py="1" rounded="sm" mb={5}>
            Something went wrong! Remember: You can only post once per topic.
        </Box>

        )
    }
}


export default PostsProvider;