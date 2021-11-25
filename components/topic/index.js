import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

const Topic = props => {

    const getColor = () => {
        switch(props.category){
            case "Tech":
                return 'lightblue'
            case "Science":
                return '#A0548B'
            case "Politics":
                return '#ECFEAA'
            case "Sports":
                return '#5C7457'
        }
    }

    const goToTopic = () => {
        if(props.navigation){
            props.navigation.push('Home', {screen: 'Topic', params: {id: props.id}})
        }
    }

    return(
        <TouchableOpacity onPress={goToTopic} activeOpacity={props.navigation ? 0 : 1}>
        <View style={{height:150,flexDirection:'row',justifyContent:'space-between',width:'100%',padding:10,marginTop:5}}>
            <View style={{paddingRight:15,flexDirection:'column',flex:3}}>
                <View style={{flexDirection:'row',alignItems:'flex-end',marginBottom:5}}>
                    <Text style={{color:getColor()}}>{props.category}</Text>
                    <Text style={styles.timestamp}>{props.timestamp}</Text>
                </View>
                <Text style={{color:'white'}}>{props.title}</Text>
            </View>
            <Image source={props.imageUri} resizeMode='contain' style={{height:'100%',flex:1}}/>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    timestamp: {
        color:'white',
        opacity:.7,
        fontSize:12, 
        marginLeft:10
    }
})

export default Topic;