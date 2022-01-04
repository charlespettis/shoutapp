import React from 'react';
import {SafeAreaView, FlatList,View, ActivityIndicator, RefreshControl} from 'react-native';
import TouchableIcon from '../components/common/TouchableIcon';
import Topic from '../components/topic';
import Post from '../components/post';
import Recorder from '../components/recorder';
import EmptyListComponent from '../components/common/EmptyListComponent';
import {TopicsContext} from '../components/contexts/TopicsProvider';
import { createPost } from '../api/post';
import { PostsContext } from '../components/contexts/PostsProvider';
import { GlobalPlayerContext } from '../components/contexts/GlobalPlayerProvider';
import { UserContext } from '../components/contexts/UserProvider';
const ViewTopic = ({navigation, route}) => {
    const {topics, topicsFunctions} = React.useContext(TopicsContext);
    const {posts, postFunctions} = React.useContext(PostsContext);
    const {userFunctions, userState} = React.useContext(UserContext);
    const {player, playerFunctions} = React.useContext(GlobalPlayerContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isRecorderShown, setIsRecorderShown] = React.useState(false);
    const [isRecording, setIsRecording] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [offset, setOffset] = React.useState(10);

    const getTopic = () => {
        const index = topics.findIndex(e => e.id === route.params.id);
        if(index > -1){
            return(
                <View style={{paddingBottom:10,backgroundColor:'black'}}>
                <Topic
                id={topics[index]['id']}
                category={topics[index]['category']}
                title={topics[index]['title']}
                imageUri={topics[index]['image']}
                timestamp={topics[index]['createdAt']}
                sourceUrl={topics[index]['sourceUrl']}
                />
                </View>
            )
        }
    }

    const renderItem = ({item}) => {
        return(
        <Post
            id = {item.id}
            fullName = {item["User"].fullName}
            username = {item["User"].username}
            avatar = {item["User"].avatar}
            recording = {item.recording}
            likes={item.Likes}
            navigation={navigation}
            createdAt={item.createdAt}
            jobTitle={item["User"].jobTitle}
            userId={item["User"].id}
        />)
    }

    const toggleRecorder = () => {
        if(isRecorderShown){
            setIsRecorderShown(false);
        } else {
            playerFunctions.stop();
            setIsRecorderShown(true);
        }
    }

    const submit = async recording => {
        await postFunctions.createPost({recording: recording, topicId: route.params.id})
        setIsRecorderShown(false)
    }

    React.useEffect(()=>{
        //get 15 and set count / offset ;)
        (
            async function(){
                await postFunctions.getPostsByTopic({id: route.params.id, count: 10})
            }
        )();
        setIsLoading(false);
    },[])

    React.useEffect(()=>{
        const mount = navigation.addListener('focus', () => {
            playerFunctions.lower();
        })
        const unMount = navigation.addListener('blur', () => {
            playerFunctions.raise();
        })
        return () => {
            mount,
            unMount
        } 
    },[navigation])

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await postFunctions.getPostsByTopic({id: route.params.id, count: 10})
        setIsRefreshing(false);
    }

    const handleEndReached = async () => {
        await postFunctions.getPostsByTopic({id: route.params.id, count:10, offset: offset})
        setOffset(prevState => {return prevState + 10})
    }

    return(
        <View style={{flex:1,backgroundColor:'#2A2A2C'}}>
        <SafeAreaView style={{flex:1}}>
            <Header onAdd={toggleRecorder} isRecorderShown={isRecorderShown} goBack={()=>{navigation.goBack()}}/>
            <View style={{backgroundColor:'black', flex:1}}>
            {
            isLoading ? <ActivityIndicator size='small' /> :
            <FlatList
             stickyHeaderIndices={[0]}
             onRefresh={handleRefresh}
             onEndReached={({ distanceFromEnd }) => {
                if(distanceFromEnd >= 0) {
                    handleEndReached
                }}}
             refreshing={isRefreshing}
             onEndReachedThreshold={.5}
             ListHeaderComponent={getTopic()}
             data={posts.filter(e => !userState.blocked.includes(e["User"].id))}
             renderItem={renderItem}
             indicatorStyle='white'
             refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={isRefreshing} tintColor='white'/>}
             ListEmptyComponent={ <EmptyListComponent style={{paddingTop:'25%'}}/>}
            />
            }
            {
            isRecorderShown && 
            <Recorder
            onSubmit={e=> submit(e)}
            onReset = { toggleRecorder }
            onRecordingStart={() => setIsRecording(true)}
            onRecordingStop={() => setIsRecording(false)}
            style={{paddingTop:20}}
            />
            }
            </View>
        </SafeAreaView>
        </View>
    )

}

export default ViewTopic;

const Header = props => {
    return(
        <View style={{backgroundColor:'#2A2A2C',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,}}>
            <TouchableIcon
            color="white"
            size={26}
            name="chevron-back"
            onPress={()=>props.goBack()}
            />
            <TouchableIcon
            color="white"
            size={26}
            name={props.isRecorderShown ? "remove-outline": "add"}
            onPress={()=>props.onAdd()}
            />

        </View>
    )
}
