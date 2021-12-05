import React from 'react';
import {View} from 'react-native';

const GlobalPlayerProvider = props => {
    
    return(
            <>
                {
                    props.children
                }
                <View style={{position:'absolute',width:'0%',alignSelf:'center',height:60,top:'89s%',backgroundColor:'#1C1C1E', borderRadius:3}}/>
            </>            
    )
}

export default GlobalPlayerProvider;