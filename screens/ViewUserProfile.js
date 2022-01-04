import React from 'react';
import { View, Text, SafeAreaView, Image, FlatList, Alert } from 'react-native';
import { GlobalPlayerContext } from '../components/contexts/GlobalPlayerProvider';
import { getUserDetails } from '../api/user';
import { env } from '../misc';
import Ionicons from '@expo/vector-icons/Ionicons';
import Topic from '../components/topic';
import Post from '../components/post';
import { UserContext } from '../components/contexts/UserProvider';

const ViewUserProfile = ({navigation, route}) => {
    const {player, playerFunctions} = React.useContext(GlobalPlayerContext);
    const [userData, setUserData] = React.useState({});
    const {userFunctions, userState} = React.useContext(UserContext);

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

    const renderItem = ({item}) => {
        return(
            <View style={{marginBottom:10}}>
            <Topic
                id={item["Topic"].id}
                category={item["Topic"].category}
                title={item["Topic"].title}
                imageUri={item["Topic"].image}
                timestamp={item["Topic"].createdAt}
                navigation={navigation}
            />
            <Post 
                id = {item.id}
                fullName = {userData.fullName}
                jobTitle = {userData.jobTitle}
                avatar = {userData.avatar}
                recording = {item.recording}
                likes={item.likes ? item.likes : []}
                navigation={navigation}
                userId={userData.id}
                createdAt={item.createdAt}
            />
            </View>
        )
    }

    const handleBlock = () => {
        Alert.alert(
            "Block User",
            "Are you sure you'd like to block this user?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Confirm", onPress: block }
            ]
          );
    }

    const handleUnblock = () => {
        Alert.alert(
            "Unblock User",
            "Are you sure you'd like to unblock this user?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Confirm", onPress: unblock }
            ]
          );

    }

    const unblock = () => {
        userFunctions.unblock(userData.id);
        navigation.goBack();
    }

    const block = () => {
        userFunctions.block(userData.id)
        navigation.goBack();
    }


    return(
        <SafeAreaView style={{flex:1, backgroundColor:'black',}}>
            <View style={{margin:20,justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
            <Ionicons onPress={()=>navigation.goBack()} name='chevron-back' size={26} color='white' />
            <Ionicons onPress={userState.blocked.includes(userData.id) ? handleUnblock : handleBlock} name={userState.blocked.includes(userData.id) ? 'remove-circle-outline' : 'close-circle-outline'} size={26} color='white' />
            </View>
            <FlatList
                data={userData["Posts"]}
                keyExtractor={e => e.id}
                renderItem={renderItem}
                style={{flex:1,width:'100%',height:'100%'}}
                contentContainerStyle={{paddingBottom:80}}
                ListHeaderComponent={
                    <View style={{alignItems:'center'}}>
                        <Image style={{height:100,width:100,borderRadius:100}} source={{uri: `${userData.avatar}`}}/>
                        <Text style={{color:'white',fontSize:22,marginTop:5}}>{userData.fullName}</Text>
                        <Text style={{color:'lightblue',fontSize:14,marginTop:5}}>@{userData.username}</Text>
                        <Text style={{color:'white',fontSize:14,marginTop:5}}>{userData.jobTitle} {userData.company && `at ${userData.company}`}</Text>
                        <Text style={{color:'white',fontSize:14,alignSelf:'flex-start',margin:20,marginLeft:10}}>{userData.bio}</Text>
                        <Text style={{color:'white',fontWeight:'200',alignSelf:'flex-start',margin:10}}>Recent Posts</Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}

export default ViewUserProfile;
