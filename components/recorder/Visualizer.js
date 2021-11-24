import React from 'react';
import { View, StyleSheet } from 'react-native';

const Visualizer = props => {

    return(
    <View style={styles.barContainer}>
    {
        props.barValues.map(e => {
            if(e){ 
            return(
                <Bar 
                    height={e}
                />
            )}
        })
    }
    </View>
    )
}



const Bar = props => {
    return(
        <View
            style={[{height: props.height}, styles.bar]}
        />
    )
}

const styles = StyleSheet.create({
    bar: {
        backgroundColor: 'red',
        width: 1,
        marginRight: 3
    },
    barContainer: {
        height:50,
        width:'100%', 
        alignItems:'center',
        flexDirection:'row',
        marginTop:10,
        marginBottom:10
    }
})

export default Visualizer;