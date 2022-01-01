import React from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getPostsByUserId } from '../api/post';
import { UserContext } from '../components/contexts/UserProvider';
import Empty from '../components/common/EmptyListComponent';
import Topic from '../components/topic';
import Post from '../components/post';

const ViewRecentPosts = ({navigation, route}) => {

    const {userState, userFunctions} = React.useContext(UserContext);
    const [data, setData] = React.useState([]);


    React.useEffect(()=>{
        getPostsByUserId({count: 10})
        .then(data => {
            if(data){
                setData(data);
            }
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
                fullName = {userState.fullName}
                username = {userState.username}
                avatar = {userState.avatar}
                jobTitle={userState.jobTitle}
                recording = {item.recording}
                likes={item.likes ? item.likes : []}
                navigation={navigation}
                userId={userState.id}
                createdAt={item.createdAt}
            />
            </View>
        )
    }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'black',}}>
            <View style={{paddingBottom:120}}>
            <Ionicons name="chevron-back" size={22} style={{margin:20}} color="white" onPress={()=>navigation.goBack()} />
            <FlatList 
                data={data}
                renderItem={renderItem}
                ListEmptyComponent={Empty}
            />
            </View>
        </SafeAreaView>
    )
}

export default ViewRecentPosts;