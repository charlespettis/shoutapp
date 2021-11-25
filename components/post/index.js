import React from 'react';
import {View, Text, Image} from 'react-native';
import Skiier from '../../assets/images/skiing.jpg';
import Player from '../player';
import TouchableIcon from '../common/TouchableIcon';

const Post = props => {
    return(
        <View style={{flexDirection:'row',marginTop:10,marginBottom:20,width:'95%',alignSelf:'center'}}>
            <Image source={Skiier} style={{width:70,height:70,borderRadius:100}} resizeMode='cover'/>
            <View style={{flexDirection:'column',alignItems:'flex-start',flex:4,paddingLeft:20,paddingRight:20}}>
                <Text style={{color:'white'}}>{props.fullName}</Text>
                <Text style={{color:'white',marginBottom:10}}>{props.jobTitle} @ {props.company}</Text>
                <Player 
                recording={'../../assets/sounds/beep_up.wav'} 
                rightIcon={<TouchableIcon name="flag-outline" size={22} color='white' onPress={()=>alert('re')}/>} 
                leftIcon={<TouchableIcon name="heart-outline" size={22} color='white' onPress={()=>alert('re')}/>} 
                />
            </View>
        </View>
    )
}

export default Post;