import React from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import { getFlags } from '../api/admin';
import Post from '../components/post';
import Empty from '../components/common/EmptyListComponent';
import Ionicons from '@expo/vector-icons/Ionicons';

const ViewFlags = ({navigation}) => {
    const [data, setData] = React.useState([]);

    React.useEffect(()=> {
        getFlags()
        .then(data => {
            setData(data)            
        })
    }, [])

    const renderItem = ({item}) => {
        return(
            <Post 
            likes={[]}
            avatar={item["Post"]["User"].avatar}
            fullName={item["Post"]["User"].fullName}
            id={item["Post"]['id']}
            username={item["Post"]["User"]["username"]}
            recording={item["Post"]["recording"]}
            createdAt={item["Post"].createdAt}
            />
        )
    }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <Ionicons size={22} color='white' name='chevron-back' style={{margin:20}} onPress={()=>navigation.goBack()}/>
            <FlatList
                data={data}
                renderItem={renderItem}
                ListEmptyComponent={<Empty/>}
            />
        </SafeAreaView>
    )
}

export default ViewFlags;