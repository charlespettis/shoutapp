import React from 'react';
import { View, StyleSheet } from 'react-native';

const Visualizer = props => {
    return(
    <View style={styles.barContainer}>
    {
        props.barValues.map((e, i) => {
            if(e){ 
            return(
                <Bar
                    keyExtractor={e + i} 
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
            key={props.keyExtractor}
            style={[{height: props.height}, styles.bar]}
        />
    )
}

const styles = StyleSheet.create({
    bar: {
        backgroundColor: 'red',
        width: 1,
        marginRight: 4
    },
    barContainer: {
        height:50,
        width:'100%', 
        alignItems:'center',
        flexDirection:'row',
    }
})

export default Visualizer;