import React from 'react';
import {View, Pressable, Text, Image, StyleSheet} from 'react-native';

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
            props.navigation.navigate('Topic', {id: props.id})
        }
    }

    return(
        <Pressable key={props.id} onPress={goToTopic} >
        <View style={{minHeight:100,flexDirection:'row-reverse',justifyContent:'space-between',backgroundColor:'black',width:'100%',padding:10}}>
            <View style={{marginLeft:15,flexDirection:'column',flex:3}}>
                <View style={{flexDirection:'row',alignItems:'flex-end',marginBottom:5}}>
                    <Text style={{color:getColor()}}>{props.category}</Text>
                    <Text style={styles.timestamp}>{props.timestamp}</Text>
                </View>
                <Text style={{color:'white'}}>{props.title}</Text>
            </View>
            <Image source={props.imageUri} resizeMode='cover' style={{height:'100%',flex:1}}/>
        </View>
        </Pressable>
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