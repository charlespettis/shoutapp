import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { GlobalPlayerContext } from '../components/contexts/GlobalPlayerProvider';
import { getUserDetails } from '../api/user';
import { env } from '../misc';
import Ionicons from '@expo/vector-icons/Ionicons';

const ViewUserProfile = ({navigation, route}) => {
    const {player, playerFunctions} = React.useContext(GlobalPlayerContext);
    const [userData, setUserData] = React.useState({});
    
    React.useEffect(()=>{
        const lower = navigation.addListener('focus', () => {
            playerFunctions.lower();
        })
        const raise = navigation.addListener('blur', () => {
            playerFunctions.raise();
        })

        return () => ({lower, raise})

    },[navigation])

    React.useEffect(()=>{
        getUserDetails(route.params.id)
        .then(data => {
            setUserData(data);
        })
    },[])

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'black',alignItems:'center'}}>
            <Ionicons onPress={()=>navigation.goBack()} name='chevron-back' size={26} color='white' style={{alignSelf:'flex-start',margin:20}} />
            <Image style={{height:100,width:100,borderRadius:100,marginTop:10}} source={{uri: `${env}${userData.avatar}`}}/>
            <Text style={{color:'white',fontSize:22,marginTop:10}}>{userData.fullName}</Text>
            <Text style={{color:'lightblue',fontSize:14,marginTop:10}}>@{userData.username}</Text>
            <Text style={{color:'white',fontSize:14,marginTop:10}}>{`${userData.jobTitle} at ${userData.company}`}</Text>
            <Text style={{color:'white',fontSize:14,marginTop:10,alignSelf:'flex-start',margin:20}}>{userData.bio}</Text>
        </SafeAreaView>
    )
}

export default ViewUserProfile;
