import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import Topic from '../components/topic';
import EmptyListComponent from '../components/common/EmptyListComponent';
import {TopicsContext} from '../components/contexts/TopicsProvider';

const Feed = ({navigation, route}) => {

    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const {topics, topicsFunctions} = React.useContext(TopicsContext);
    const [count, setCount] = React.useState(0);

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

    const handleGetAllTopics = async () => {
        setIsRefreshing(true)
        if(route.name === "Latest"){
            await topicsFunctions.getAll();
        }
        else {
            await topicsFunctions.getAllByCategory(route.name)
        }
        setIsRefreshing(false);
    }

    const handleGetMoreTopics = () => {
        if(route.name === "Latest"){
            topicsFunctions.getMore(count + 10);
        }
        else {
            topicsFunctions.getMoreByCategory(route.name, count + 10)
        }
        setCount(prevState => prevState + 10)
    }

    React.useEffect(()=>{
        if(route.name === 'Latest'){
            topicsFunctions.getAll()
            console.log('ree');
        } 
    },[])

    return(
        <View style={{flex:1,backgroundColor:'black'}}>
            <FlatList
                data={ route.name === 'Latest' ? topics : topics.filter(e => e.category === route.name) }
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshing={isRefreshing}
                onRefresh={handleGetAllTopics}
                onEndReachedThreshold={0.5}
                style={{padding:2}}
                onEndReached={({ distanceFromEnd }) => {
                    if(distanceFromEnd >= 0) {
                        handleGetMoreTopics();
                    }
                }}
                indicatorStyle={'white'}                       
                ListEmptyComponent={<EmptyListComponent style={{paddingTop:'50%'}}/>}
                refreshControl={
                    <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={handleGetAllTopics}
                    tintColor="#fff"
                 />
                }
            />
        </View>
    )
}

export default Feed;


