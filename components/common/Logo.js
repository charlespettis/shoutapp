import React from 'react';
import {View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Logo = props => {
    return(
        <View style={[{backgroundColor:'#b33f40',width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:50}, {...props.style}]}>
            <Ionicons name="megaphone" style={{color:'white', transform:[{rotate:'-11.25deg'}]}} size={32} color="green" />
        </View>
    )
}

export default Logo;
