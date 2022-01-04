import React from 'react';
import {View, Pressable, Text, Image, StyleSheet, Linking} from 'react-native';
import {env, timeSince} from '../../misc';
import Ionicons from '@expo/vector-icons/Ionicons';

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
            case "Finance":
                return 'orange';
        }
    }

    const goToTopic = () => {
        if(props.navigation){
            props.navigation.navigate('Topic', {id: props.id})
        }
    }

    const pressLink = async () => {
        const supported = await Linking.canOpenURL(props.sourceUrl);
        if(supported){
            await Linking.openURL(props.sourceUrl);
        } else {
            alert('Invalid Url!');
        }
    }
    let formattedSourceUrl;
    if(props.sourceUrl){
        formattedSourceUrl = props.sourceUrl.split("//")[1];
    }
    return(
        <Pressable key={props.id} onPress={goToTopic} >
        <View style={{minHeight:100,flexDirection:'row',justifyContent:'space-between',backgroundColor:'black',flex:1,padding:10}}>
    
            <Image source={{uri: `${props.imageUri}`}} resizeMode='cover' style={{height:'100%',flex:1}}/>

            <View style={{marginLeft:15,flexDirection:'column',flex:3,justifyContent:props.sourceUrl ? 'space-between' : 'flex-start'}}>
                <View style={{flexDirection:'row',alignItems:'flex-end',marginBottom:5}}>
                    <Text style={{color:getColor()}}>{props.category}</Text>
                    <Text style={styles.timestamp}>{timeSince(props.timestamp)}</Text>
                </View>

                <Text style={{color:'white'}}>{props.title}</Text>

                {formattedSourceUrl &&
                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                    <Ionicons name='link-outline' color={'white'} style={{marginRight:5}} />
                    <Text numberOfLines={1} onPress={pressLink} style={{color:'lightblue', }}>{formattedSourceUrl.length > 30 ? `${formattedSourceUrl.slice(0,30)}...` : formattedSourceUrl}</Text>
                </View>
                }

            </View>
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