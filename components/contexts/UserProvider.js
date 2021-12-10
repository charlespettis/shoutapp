import React from 'react';
import {createAccount, login,verify, editAvatar, editUserDetails} from '../../api/user';
import storage from '../../storage';

export const UserContext = React.createContext();

const UserProvider = props => {

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch(action.type){
                case "UPDATE":
                    return {
                        ...prevState,
                        ...action.data
                    }
            }
        },
        {
            username: '',
            email: '',
            password: '',
            fullName: '',
            jobTitle: '',
            avatar: '',
            admin: 0,
            isLoggedIn:false
        }
    )

    const userFunctions = React.useMemo(
        () => ({
            updateUserInfo: data => {
                dispatch({type: "UPDATE", data: data});
            },
            createAccount: () => {
                createAccount(state)
                .then(data => {
                    data['data']['isLoggedIn'] = true;
                    storage.setToken(data['token'])
                    .then(()=> {
                        dispatch({type: "UPDATE", data: data['data']})
                    })
                })
            },
            login: encodedCredentials => {
                login(encodedCredentials)
                .then(data => {
                    data['data']['isLoggedIn'] = true;
                    storage.setToken(data['token'])
                    .then(()=> {
                        dispatch({type: "UPDATE", data: data['data']})
                    })
                })
            },
            editAvatar: data => {
                editAvatar(data)
                .then(res => {
                    dispatch({type: "UPDATE", data: res})
                })
            },
            editUserDetails: data => {
                editUserDetails(data)
                .then(res => {
                    dispatch({type: "UPDATE", data: res})
                })
            },
            logOut: () => {
                storage.removeToken();
                dispatch({type:"UPDATE", data: {
                    username: '',
                    email: '',
                    password: '',
                    fullName: '',
                    jobTitle: '',
                    avatar: '',
                    admin: 0,
                    isLoggedIn:false
                }})
            }
        })
    );
    
    React.useEffect(()=>{
        verify()
        .then(data => {
            if(data){
                data.isLoggedIn = true;
                dispatch({type:"UPDATE", data: data})
            }
        })
    },[])

    return(
        <UserContext.Provider value={{userFunctions: userFunctions, userState: state}}>
            <>
                {
                    props.children
                }
            </>            
        </UserContext.Provider>
    )
}

export default UserProvider;