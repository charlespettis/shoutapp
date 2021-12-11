import React from 'react';
import {getTopics, getTopicsByCategory} from '../../api/topic';

export const TopicsContext = React.createContext();

const TopicsProvider = props => {

    const initialState = []

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch(action.type){
                case "GETNEWEST": {
                    let data = [...prevState];
                    action.data.map(e => {
                        const ind = data.findIndex(ee => ee.id === e.id);
                        if(ind === -1) data = [e, ...data];
                    })
                    return data
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
                getTopics(10)
                .then(data => {
                    dispatch({type: "GETNEWEST", data: data})
                })
            },
            getAllByCategory: category => {
                getTopicsByCategory(category, 10)
                .then(data => {
                    dispatch({type: "GETNEWEST", data: data})
                })
            },
            getMore: count => {
                getTopics(count)
                .then(data => {
                    dispatch({type:"GETMORE", data: data})
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