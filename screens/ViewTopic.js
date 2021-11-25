import React from 'react';
import {SafeAreaView, View, FlatList, Text} from 'react-native';
import TouchableIcon from '../components/common/TouchableIcon';
import Topic from '../components/topic';
import {DUMMY_DATA} from '../data';
import Post from '../components/post';

const ViewTopic = ({navigation, route}) => {
    
    const getTopic = () => {
        const index = DUMMY_DATA.findIndex(e => e.id === route.params.id);
        return(
        <>
            <Topic
            category={DUMMY_DATA[index]['category']}
            title={DUMMY_DATA[index]['title']}
            imageUri={DUMMY_DATA[index]['imageUri']}
            timestamp={DUMMY_DATA[index]['timestamp']}
            />
            <View style={{backgroundColor:'white', opacity:.1,alignSelf:'center',width:'90%',height:1,marginBottom:10}} />
        </>
        )
    }

    const renderItem = ({item}) => (
        <Post
            fullName = {item.fullName}
            jobTitle = {item.jobTitle}
            company = {item.company}
        />
    )

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
             ListFooterComponent={<Text>asd</Text>}
            />


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