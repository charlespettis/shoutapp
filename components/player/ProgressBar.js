import React from 'react';
import {View, StyleSheet} from 'react-native';


const ProgressBar = props => {
    return(
        <View style={[{width: props.progress}, styles.container]}/>
    )
}

const styles = StyleSheet.create({
    container: {
        position:'relative',
        top:10,
        height:1,
        backgroundColor:'red',
        alignSelf:'flex-start'
    }
})

export default ProgressBar;