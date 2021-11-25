import React from 'react';
import {View, StyleSheet} from 'react-native';


const ProgressBar = props => {
    return(
        <View style={{flexDirection:'row',alignItems:'flex-end',width:'100%'}}>
            <View style={[{width: props.progress}, styles.filled]}/>
            <View style={styles.handle}/>
        </View>
    )
}

const styles = StyleSheet.create({
    filled: {
        height:2,
        backgroundColor:'red',
        marginTop:20,
    },
    handle: {
        height:5,
        width:5,
        borderRadius:50,
        backgroundColor:'white',
        top:1
    }
})

export default ProgressBar;