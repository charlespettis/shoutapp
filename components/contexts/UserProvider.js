import React from 'react';
import {createAccount, login,verify, editAvatar, editUserDetails} from '../../api/user';
import storage from '../../storage';
import SplashScreen from '../../screens/SplashScreen';

export const UserContext = React.createContext();

const UserProvider = props => {

    const initialState = {
        username: '',
        email: '',
        password: '',
        company: '',
        fullName: '',
        jobTitle: '',
        avatar: '',
        admin: 0,
        blocked: [],
        isLoggedIn:false

    }

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
        initialState
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
            block: id => {
                const updatedList = [...state.blocked, id];
                storage.setBlocks(updatedList);
                dispatch({type:"UPDATE", data :{blocked: updatedList}})
            },
            unblock: id => {
                const index = state.blocked.findIndex(e => e === id);
                if(index > -1){
                    const updatedList = [...state.blocked]
                    updatedList.splice(index, 1);
                    console.log(updatedList);
                    storage.setBlocks(updatedList);
                    dispatch({type:"UPDATE", data: {blocked: updatedList}})
                }
            },
            logOut: () => {
                storage.removeToken();
                dispatch({type:"UPDATE", data: initialState})
            }
        })
    );
    
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(()=>{
        verify()
        .then(data => {
            if(data){
                storage.getBlocks()
                .then(blocked => {
                    data['blocked'] = blocked;
                    data.isLoggedIn = true;
                    dispatch({type:"UPDATE", data: data})
    
                })                
            }
            setIsLoading(false);
        })
    },[])

    return(
        <UserContext.Provider value={{userFunctions: userFunctions, userState: state}}>
            <>
                {
                    isLoading ?
                    <SplashScreen/> 
                    :
                    props.children
                }
            </>            
        </UserContext.Provider>
    )
}

export default UserProvider;