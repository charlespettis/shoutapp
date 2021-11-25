import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const TouchableIcon = props => {
    return(
        <TouchableOpacity
        onPress={props.onPress}
        style={props.style}
        >
        <Ionicons name={props.name} size={props.size} color={props.color}/>
        </TouchableOpacity>
    )
}

export default TouchableIcon;
