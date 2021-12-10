import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Skiier from '../../assets/images/skiing.jpg';
import Player from '../player';
import TouchableIcon from '../common/TouchableIcon';
import {Ionicons} from '@expo/vector-icons';

const Post = props => {
    return(
        <View style={styles.container}>

                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={Skiier} style={styles.avatar} resizeMode='cover'/>
                    <View style={{marginLeft:15,justifyContent:'space-between'}}>
                        <Text style={{color:'white',fontSize:16,marginBottom:5}}>{props.fullName}</Text>
                        <Text style={{color:'white',marginBottom:5,fontWeight:'200'}}>@itsanikabitch</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Ionicons name='heart-outline' color='rgba(255,255,255,.7)' size={22} style={{marginRight:15}}/>
                    <Ionicons name='person-outline' color='rgba(255,255,255,.7)' size={22} style={{marginRight:15}}/>
                    <Ionicons name='flag-outline' color='rgba(255,255,255,.7)' size={22}/>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        margin:10
        
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