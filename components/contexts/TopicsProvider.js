import React from 'react';
import {getTopics, getTopicsByCategory} from '../../api/topic';

export const TopicsContext = React.createContext();

const TopicsProvider = props => {

    const initialState = []

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch(action.type){
                case "GETNEWEST": {
                    return action.data
                }
                case "GETMORE": {
                    let data = [...prevState];
                    action.data.map(e => {
                        let ind = data.findIndex(ee => ee.id === e.id);
                        if(ind === -1) data = [...data, e];
                    })
                    return data
                }
    
            }
        },
        initialState
    )

    const topicsFunctions = React.useMemo(
        () => ({
            getAll: () => {
                getTopics(0,10)
                .then(data => {
                    dispatch({type: "GETNEWEST", data: data})
                })
            },
            getAllByCategory: category => {
                getTopicsByCategory(category, 0, 10)
                .then(data => {
                    const result = [...state].filter(e => e.category !== category);
                    result.push(...data);
                    result.sort((a,b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    })
                    dispatch({type: "GETNEWEST", data: result})
                })
            },
            getMore: offset => {
                getTopics(offset, 10)
                .then(data => {
                    dispatch({type:"GETMORE", data: data})
                })
            },
            getMoreByCategory: (category, offset) => {
                getTopicsByCategory(category, offset, 10)
                .then(data => {
                    dispatch({type: "GETMORE", data: data});
                })
            }
        })
    )


    return(
        <TopicsContext.Provider value={{topics: state, topicsFunctions: topicsFunctions}}>
            {props.children}
        </TopicsContext.Provider>
    )
}

export default TopicsProvider;