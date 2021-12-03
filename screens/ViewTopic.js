import React from 'react';
import {SafeAreaView, FlatList,View, Text} from 'react-native';
import {Fab, Icon, Switch} from 'native-base';
import TouchableIcon from '../components/common/TouchableIcon';
import Topic from '../components/topic';
import {DUMMY_DATA} from '../data';
import Post from '../components/post';
import Recorder from '../components/recorder';
import {Ionicons} from '@expo/vector-icons';
import EmptyListComponent from '../components/common/EmptyListComponent';

const ViewTopic = ({navigation, route}) => {
    const [isRecorderShown, setIsRecorderShown] = React.useState(false);
    const [isRecording, setIsRecording] = React.useState(false);
    
    const getTopic = () => {
        const index = DUMMY_DATA.findIndex(e => e.id === route.params.id);
        return(
            <Topic
            id={DUMMY_DATA[index]['id']}
            category={DUMMY_DATA[index]['category']}
            title={DUMMY_DATA[index]['title']}
            imageUri={DUMMY_DATA[index]['imageUri']}
            timestamp={DUMMY_DATA[index]['timestamp']}
            />
        )
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
        <SafeAreaView style={{flex:1,backgroundColor:'#1D201F'}}>
            
            <TouchableIcon
            color="white"
            size={32}
            name="chevron-back"
            onPress={()=>navigation.goBack()}
            style={{marginLeft:5,marginTop:10,marginBottom:10}}
            />
            <FlatList
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

            {
            (!isRecording) &&
            <Fab
            icon={<Icon color='white' as={<Ionicons name={isRecorderShown ? 'close' : 'add'}/>}/> }
            size='md'
            bottom={isRecorderShown ? 90 : 35}
            onPress={toggleRecorder}
            />
            }

        </SafeAreaView>
    )

}

export default ViewTopic;

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

]