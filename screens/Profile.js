import React from 'react';
import {SafeAreaView, Text, Image} from 'react-native';
import Skiier from '../assets/images/skiing.jpg';

const Profile = () => {
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#1D201F',alignItems:'center'}}>
            <Image source={Skiier} style={{width:125,height:125,borderRadius:100,marginTop:20}} resizeMode='cover'/>
            <Text style={{color:'white',fontSize:24,marginTop:20}}>Anika Bodanika</Text>
            <Text style={{color:'white',marginTop:5}}>Software Developer</Text>
            <Text style={{color:'white',marginTop:5}}>Shout, LLC.</Text>
        </SafeAreaView>
    )
}

export default Profile;