import React from 'react';
import {View, Text} from 'react-native';

const List = props => {
    return(
        <View style={{alignItems:'flex-start',width:'90%',alignSelf:'center',marginTop:20}}>
            <Text style={{color:'white', opacity:.5}}>{props.title.toUpperCase()}</Text>
            {props.children}
        </View>
    )
}

export default List;