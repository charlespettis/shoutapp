import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import Topic from '../components/topic';
import EmptyListComponent from '../components/common/EmptyListComponent';
import {getTopics, getTopicsByCategory} from '../api/topic';
import {TopicsContext} from '../components/contexts/TopicsProvider';

const Feed = ({navigation, route}) => {

    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const {topics, topicsFunctions} = React.useContext(TopicsContext);
    const [count, setCount] = React.useState(20);

    const renderItem = ({ item }) => (
        <Topic
        id={item.id}
        category={item.category}
        title={item.title}
        imageUri={item.image}
        timestamp={item.createdAt}
        navigation={navigation}
        />
    );

    const handleRefresh = () => {
        handleGetTopics(10);
    }

    const handleOnEndReached = () => {
        handleGetTopics(count + 10);
        setCount(prevState => prevState + 10)
    }

    const handleGetTopics = (count) => {
        setIsRefreshing(true)
        if(route.name === "Latest"){
            getTopics(count)
            .then(data => {
                if(data){
                    topicsFunctions.update(data)
                }
            })
        }
        else {
        getTopicsByCategory(route.name, count)
        .then(data => {
            if(data){
                topicsFunctions.update(data);
            }
        })
        }
        setIsRefreshing(false);
    }

    return(
        <View style={{flex:1,backgroundColor:'black'}}>
            <FlatList
                data={ topics.topics && topics.topics }
                renderItem={renderItem}
                extraData={topics.topics}
                keyExtractor={item => item.id}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                onEndReachedThreshold={0.5}
                style={{padding:2}}
                onEndReached={({ distanceFromEnd }) => {
                    if(distanceFromEnd >= 0) {
                        handleOnEndReached();
                    }
                }}
                indicatorStyle={'white'}                       
                ListEmptyComponent={<EmptyListComponent style={{paddingTop:'50%'}}/>}
                refreshControl={
                    <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    tintColor="#fff"
                 />
                }
            />
        </View>
    )
}

export default Feed;


