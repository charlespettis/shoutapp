import React from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import { getLikes } from '../api/user';
import Ionicons from '@expo/vector-icons/Ionicons';
import Empty from '../components/common/EmptyListComponent';
import Topic from '../components/topic';
import Post from '../components/post';

const ViewLikes = ({navigation, route}) => {

    const [data, setData] = React.useState([]);

    React.useEffect(()=>{
        getLikes()
        .then(data => {
            setData(data);
        })
    },[])

    const renderItem = ({item}) => {
        return(
            <View key={item["Post"].id}>
                <Topic
                id={item["Post"]["Topic"].id}
                imageUri={item["Post"]["Topic"].image}
                title={item["Post"]["Topic"].title}
                timestamp={item["Post"]["Topic"].createdAt}
                />
                <Post
                    id={item["Post"].id}
                    avatar={item["Post"]["User"].avatar}
                    fullName={item["Post"]["User"].fullName}
                    createdAt={item["Post"].createdAt}
                    username={item["Post"]["User"].username}
                    recording={item["Post"].recording}
                    likes={[]}
                />
            </View>
        )
    }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <Ionicons name='chevron-back' size={22} style={{margin:20}} color={'white'} onPress={()=>navigation.goBack()}/>
            <FlatList
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={<Empty/>}
            />
        </SafeAreaView>
    )
}

export default ViewLikes;