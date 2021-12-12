import React from 'react';
import {View, Text, Image, StyleSheet,TouchableWithoutFeedback} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {env,timeSince} from '../../misc';
import {GlobalPlayerContext} from '../contexts/GlobalPlayerProvider';

const Post = props => {
    const {player, playerFunctions} = React.useContext(GlobalPlayerContext);
    const play = () => {
        playerFunctions.play(props)
    }
    return(
        <TouchableWithoutFeedback onPress={play}>
            <View style={[styles.container, player.id === props.id && {backgroundColor:'rgba(173,216,230,.2)'}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={{uri: `${env}${props.avatar}`}} style={styles.avatar} resizeMode='cover'/>
                    <View style={{marginLeft:15,justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:player.id === props.id ? 'lightblue' : 'white',fontSize:16,marginBottom:5,fontWeight:'300'}}>{props.fullName} </Text>
                        <Text style={{color:'white', color:'white',opacity:.7,fontSize:10, marginLeft:5}}>{timeSince(props.createdAt)}</Text>
                        </View>
                        <Text style={{color:player.id === props.id ? 'lightblue' : 'white',marginBottom:5,fontWeight:'200'}}>@{props.username}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Ionicons onPress={()=>alert('flaflaflunkie')} name='heart-outline' color='rgba(255,255,255,.7)' size={22} style={{marginRight:15}}/>
                    <Ionicons name='person-outline' color='rgba(255,255,255,.7)' size={22} style={{marginRight:15}}/>
                    <Ionicons name='flag-outline' color='rgba(255,255,255,.7)' size={22}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10
        
    },
    avatar: {
        width:50,
        height:50,
    },
    wrapper: {
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center',
        flex:1,
    }
})

export default Post;