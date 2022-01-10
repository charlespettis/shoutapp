import React from 'react';
import { SafeAreaView, FlatList, View, SectionList } from 'react-native';
import { getLikes } from '../api/user';
import Ionicons from '@expo/vector-icons/Ionicons';
import Empty from '../components/common/EmptyListComponent';
import Topic from '../components/topic';
import Post from '../components/post';
import { UserContext } from '../components/contexts/UserProvider';

const ViewLikes = ({navigation, route}) => {

    const [data, setData] = React.useState([]);
    const {userState, userFunctions} = React.useContext(UserContext);

    React.useEffect(()=>{
        getLikes()
        .then(data => {
            if(data){
                const result = [];
                data.forEach(e => {
                    console.log(e["Post"]["Topic"]);
                    const index = result.findIndex(ee => {return ee.topic.id === e.Post.Topic.id});
                    if(index === -1){
                        result.push(
                            {
                                topic: {
                                    ...e["Post"].Topic
                                },
                                data: [ {...e}, ]
                            }
                        )
                    } else {
                        result[index].data.push({...e})
                    }
                })
                setData(result);
            }
        })
    },[])

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <View style={{flex:1,paddingBottom:100}}>
            <Ionicons name='chevron-back' size={22} style={{margin:20}} color={'white'} onPress={()=>navigation.goBack()}/>
            <SectionList
                sections={data}
                keyExtractor={(item,index) => item + index}
                renderItem={({ item }) => <Post 
                    id={item["Post"].id}
                    avatar={item["Post"]["User"].avatar}
                    fullName={item["Post"]["User"].fullName}
                    createdAt={item["Post"].createdAt}
                    jobTitle={item["Post"]["User"].jobTitle}
                    recording={item["Post"].recording}
                    likes={[{"UserId":userState.id}]}
                    userId={item["Post"]["User"].id}
                />}
                renderSectionHeader={({section: { topic } }) => (
                    <Topic 
                        id={topic.id}
                        imageUri={topic.image}
                        title={topic.title}
                        category={topic.category}
                        timestamp={topic.createdAt}    
                    />
                ) }
                ListEmptyComponent={Empty}
            />
            
        </View>
        </SafeAreaView>
    )
}

export default ViewLikes;