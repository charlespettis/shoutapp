import React from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {getTopicsAwaitingApproval, approveTopic} from '../api/admin';
import Topic from '../components/topic';
import Empty from '../components/common/EmptyListComponent';

const ViewSuggestedTopics = () => {
    const [data, setData] = React.useState([]);

    React.useEffect(()=>{
        getTopicsAwaitingApproval()
        .then(data => {
            setData(data);
        })
    },[])

    const renderItem = ({item}) => {
        return(
            <TopicApproval category ={item.category} id={item.id} image={item.image} title={item.title} />
        )
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
            <Ionicons name='chevron-back' color='white' size={32} />
            <FlatList
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={Empty}
            />
        </SafeAreaView>
    )
}

const TopicApproval = ({category, id, image, title}) => {

    const handleApproval = () => {
        approveTopic({id: id});
    }

    return(
        <View>
        <Topic
            id = {id}
            category={category}
            imageUri={image}
            title={title}
        />
        <Ionicons onPress={handleApproval} style={{position:'absolute',left:'75%',top:'25%'}} name="thumbs-up" size={32} color='lightgreen' />
        </View>
    )
}

export default ViewSuggestedTopics;