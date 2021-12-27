import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Logo = props => {    
    return(
        <Ionicons name='megaphone-outline' size={42} style={{textShadowColor:'red',textShadowOffset:{width:0,height:0},textShadowRadius:10,transform:[{rotate:'-10deg'}], marginBottom:50}} color='red' />
    )
}

export default Logo;
