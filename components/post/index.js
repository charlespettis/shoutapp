import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Skiier from '../../assets/images/skiing.jpg';
import Player from '../player';
import TouchableIcon from '../common/TouchableIcon';

const Post = props => {
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>

                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-strt',width:'100%',marginBottom:10}}>
                <Image source={Skiier} style={styles.avatar} resizeMode='cover'/>
                    <View style={{marginLeft:'5%'}}>
                        <Text style={{color:'white'}}>{props.fullName}</Text>
                        <Text style={{color:'white',marginBottom:5}}>{props.jobTitle} @ {props.company}</Text>
                    </View>
                </View>
                
                <Player
                recording={'../../assets/sounds/beep_up.wav'} 
                rightIcon={<TouchableIcon name="flag-outline" size={22} color='white' onPress={()=>alert('re')}/>} 
                leftIcon={
                <View>
                <TouchableIcon name="heart-outline" size={24} color='white' onPress={()=>alert('re')}/>
                <Text style={{color:'white',fontSize:14,position:'absolute',left:25,top:10}}>1k</Text>
                </View>
                }                 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        borderBottomWidth:2,
        borderBottomColor:'rgba(68, 75, 73,.2)',
        margin:12,
        paddingBottom:20
        
    },
    avatar: {
        width:50,
        height:50,
        borderRadius:100,
    },
    wrapper: {
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center',
        flex:1,
    }
})

export default Post;