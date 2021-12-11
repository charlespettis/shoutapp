import React from 'react';
import {View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const Empty = props => {
    return(
        <View style={[{flex:1,justifyContent:'center',height:'100%',alignItems:'center'}, {...props.style}]}>
            <View style={{alignItems:'center',width:'75%'}}>
                <Ionicons name='sad-outline' color='white' size={32}/>
                <Text style={{textAlign:'center',color:'white',marginTop:25}}>There's nothing here! Click the plus button to start the conversation.</Text>
            </View>
        </View>
    )
}

export default Empty;