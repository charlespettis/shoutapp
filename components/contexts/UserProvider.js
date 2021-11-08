import React from 'react';

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
            userName: '',
            email: '',
            password: '',
            fullName: '',
            jobTitle: '',
            avatar: ''
        }
    )

    const userFunctions = React.useMemo(
        () => ({
            updateUserInfo: data => {
                dispatch({type: "UPDATE", data: data});
            }
        })
    );
    
    React.useEffect(()=>{
        console.log(state);
    },[state])
    
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