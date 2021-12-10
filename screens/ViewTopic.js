import React from 'react';
import {SafeAreaView, FlatList,View} from 'react-native';
import TouchableIcon from '../components/common/TouchableIcon';
import Topic from '../components/topic';
import Post from '../components/post';
import Recorder from '../components/recorder';
import EmptyListComponent from '../components/common/EmptyListComponent';
import {TopicsContext} from '../components/contexts/TopicsProvider';

const ViewTopic = ({navigation, route}) => {
    const [isRecorderShown, setIsRecorderShown] = React.useState(false);
    const [isRecording, setIsRecording] = React.useState(false);
    const {topics, topicsFunctions} = React.useContext(TopicsContext);

    const getTopic = () => {
        const index = topics.topics.findIndex(e => e.id === route.params.id);
        if(index > -1){
            return(
                <View style={{paddingBottom:10,backgroundColor:'black'}}>
                <Topic
                id={topics.topics[index]['id']}
                category={topics.topics[index]['category']}
                title={topics.topics[index]['title']}
                imageUri={topics.topics[index]['image']}
                timestamp={topics.topics[index]['createdAt']}
                />
                </View>
            )
        }
    }

    const renderItem = ({item}) => (
        <Post
            fullName = {item.fullName}
            jobTitle = {item.jobTitle}
            company = {item.company}
        />
    )

    const toggleRecorder = () => {
        if(isRecorderShown){
            setIsRecorderShown(false);
        } else {
            setIsRecorderShown(true);
        }
    }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <Header onAdd={toggleRecorder} isRecorderShown={isRecorderShown} goBack={()=>{navigation.goBack()}}/>

            <FlatList
             stickyHeaderIndices={[0]}
             ListHeaderComponent={getTopic()}
             data={POSTS_DATA}
             renderItem={renderItem}
             ListEmptyComponent={<EmptyListComponent style={{paddingTop:'25%'}}/>}
            />
            
            {
            isRecorderShown && 
            <Recorder
            onRecordingStart={() => setIsRecording(true)}
            onRecordingStop={() => setIsRecording(false)}
            style={{paddingLeft:20,paddingRight:20,paddingTop:20}}
            />
            }

        </SafeAreaView>
    )

}

export default ViewTopic;

const Header = props => {
    return(
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginRight:5,marginLeft:5,marginTop:10,marginBottom:10}}>
            <TouchableIcon
            color="white"
            size={32}
            name="chevron-back"
            onPress={()=>props.goBack()}
            />
            <TouchableIcon
            color="white"
            size={32}
            name={props.isRecorderShown ? "remove-outline": "add"}
            onPress={()=>props.onAdd()}
            />

        </View>
    )
}

const POSTS_DATA = [
    {
        fullName: 'Anika Ledouchey',
        jobTitle:'Software Developer',
        company: 'Shout, LLC.'
    },
    {
        fullName: 'Anika Ledouchey',
        jobTitle:'Software Developer',
        company: 'Shout, LLC.'
    },
    {
        fullName: 'Anika Ledouchey',
        jobTitle:'Software Developer',
        company: 'Shout, LLC.'
    },
    {
        fullName: 'Anika Ledouchey',
        jobTitle:'Software Developer',
        company: 'Shout, LLC.'
    },
    {
        fullName: 'Anika Ledouchey',
        jobTitle:'Software Developer',
        company: 'Shout, LLC.'
    },
    {
        fullName: 'Anika Ledouchey',
        jobTitle:'Software Developer',
        company: 'Shout, LLC.'
    },
    {
        fullName: 'Anika Ledouchey',
        jobTitle:'Software Developer',
        company: 'Shout, LLC.'
    },
    {
        fullName: 'Anika Ledouchey',
        jobTitle:'Software Developer',
        company: 'Shout, LLC.'
    },

]