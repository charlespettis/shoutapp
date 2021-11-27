import React from 'react';
import {View, StyleSheet} from 'react-native';


const ProgressBar = props => {
    return(
        <View style={[{width: props.progress}, styles.container]}/>
    )
}

const styles = StyleSheet.create({
    container: {
        height:2,
        backgroundColor:'red',
        marginTop:20,
        alignSelf:'flex-start'
    }
})

export default ProgressBar;