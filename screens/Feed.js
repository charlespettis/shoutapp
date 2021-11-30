import React from 'react';
import {View, FlatList, RefreshControl, Text} from 'react-native';
import Topic from '../components/topic';
import {DUMMY_DATA} from '../data';
import EmptyListComponent from '../components/common/EmptyListComponent';

const Feed = ({navigation, route}) => {

    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const renderItem = ({ item }) => (
        <Topic
        id={item.id}
        category={item.category}
        title={item.title}
        imageUri={item.imageUri}
        timestamp={item.timestamp}
        navigation={navigation}
        />
    );

    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(()=>{
            setIsRefreshing(false)
        },3000);
    }

    return(
        <View style={{flex:1,backgroundColor:'#1D201F'}}>
            <FlatList
                data={route.name !== 'Latest' ? DUMMY_DATA.filter(e => e.category === route.name) : DUMMY_DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                //refreshing={true}
                //onRefresh={()=>alert('refreshing')}
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


