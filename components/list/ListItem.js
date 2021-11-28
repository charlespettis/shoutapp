import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const ListItem = props => {
    return(
        <Pressable onPress={props.onPress} style={{flexDirection:'row',alignItems:'center',marginTop:20,justifyContent:'space-between',width:'100%'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Ionicons name={props.icon} size={16} color='rgba(255,255,255,.5)'  />
            <Text style={{color:'white',marginLeft:20,fontSize:16}}>{props.title}</Text>
            </View>
            <Ionicons name='chevron-forward' size={16} color="rgba(255,255,255,.5)"/>

        </Pressable>
    )
}

export default ListItem;