import React from 'react';
import {View, StyleSheet} from 'react-native';


const ProgressBar = props => {
    return(
        <View style={[{width: `${props.progress}%`}, styles.container]}/>
    )
}

const styles = StyleSheet.create({
    container: {
        position:'relative',
        height:1,
        backgroundColor:'white',
        alignSelf:'flex-start'
    }
})

export default ProgressBar;