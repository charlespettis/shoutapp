import React from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {getTopicsAwaitingApproval, approveTopic} from '../api/admin';
import Topic from '../components/topic';
import Empty from '../components/common/EmptyListComponent';

const ViewSuggestedTopics = ({navigation, route}) => {
    const [data, setData] = React.useState([]);

    React.useEffect(()=>{
        getTopicsAwaitingApproval()
        .then(data => {
            setData(data);
        })
    },[])

    const renderItem = ({item}) => {
        return(
            <TopicApproval sourceUrl={item.sourceUrl} category ={item.category} id={item.id} image={item.image} title={item.title} />
        )
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
            <Ionicons style={{margin:20}} onPress={()=>navigation.goBack()} name='chevron-back' color='white' size={22} />
            <FlatList
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={Empty}
            />
        </SafeAreaView>
    )
}

const TopicApproval = ({category, id, image, title, sourceUrl}) => {

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
            sourceUrl={sourceUrl}
        />
        <Ionicons onPress={handleApproval} style={{position:'absolute',left:'75%',top:'25%'}} name="thumbs-up" size={32} color='lightgreen' />
        </View>
    )
}

export default ViewSuggestedTopics;