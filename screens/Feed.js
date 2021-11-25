import React from 'react';
import {View, Text} from 'react-native';
import Topic from '../components/topic';

const Feed = ({navigation, route}) => {

    return(
        <View style={{flex:1,backgroundColor:'#1D201F'}}>
            <Topic />
            <Topic/>
            
        </View>
    )
}

export default Feed;