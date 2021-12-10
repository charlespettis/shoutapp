import React from 'react';
import {getTopics} from '../../api/topic';
import storage from '../../storage';

export const TopicsContext = React.createContext();

const TopicsProvider = props => {

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch(action.type){
                case "UPDATE":
                    return {
                        ...prevState,
                        topics: action.data
                    }
            }
        },
        {
            topics: []
        }
    )

    const topicsFunctions = React.useMemo(
        () => ({
            update: data => {
                dispatch({type: 'UPDATE', data: data})
            }
        })
    )

    React.useEffect(()=>{
            getTopics(10)
            .then(topics => {
                console.log('ree', topics);
                dispatch({type: "UPDATE", data: topics})
            })
    },[])

    return(
        <TopicsContext.Provider value={{topics: state, topicsFunctions: topicsFunctions}}>
            {props.children}
        </TopicsContext.Provider>
    )
}

export default TopicsProvider;