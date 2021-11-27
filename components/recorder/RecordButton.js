import React from 'react';
import {View, Animated, TouchableOpacity, StyleSheet} from 'react-native';

const RecordButton = props => {
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress} style={styles.button}>
                <Animated.View style={{width:props.size,height:props.size,borderRadius:props.borderRadiusAnim, backgroundColor:'red'}}/>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width:60,
        height:60,
        backgroundColor:'transparent',
        marginTop:'auto',
        marginBottom:10,
        borderWidth:3,
        borderColor:'gray',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center'
    },
    button: {
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default RecordButton;