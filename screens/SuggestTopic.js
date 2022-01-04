import React from 'react';
import {SafeAreaView, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Input, Button, Text} from 'native-base';
import UserAvatar from '../components/common/UserAvatar';
import {Ionicons} from '@expo/vector-icons';
import {suggestTopic} from '../api/topic';

const SuggestTopic = ({navigation, route}) => {
    const [category, setCategory] = React.useState('Tech');
    const [title, setTitle] = React.useState('');
    const [image, setImage] = React.useState();
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [sourceUrl, setSourceUrl] = React.useState('');
    const urlExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    const submit = () => {
        if( !title ) 
        {
            alert('Please enter a title for your post.')
        } else if (!image){
            alert('Please select an image for your post.')
        } else if (sourceUrl && !urlExp.test(sourceUrl)){
            alert('Please enter a valid https url.')
        }
        else {
            setIsLoading(true);
            suggestTopic({category: category, title: title, image: image, sourceUrl: sourceUrl})
            .then(res => {
                setIsLoading(false);
                if(res.status === 200){
                    setIsSubmitted(true);
                } else {
                    alert('Something went wrong. Please try again later.')
                }


            })
        }
    }

    const suggestAnother = () => {
        setIsSubmitted(false);
        setImage(null);
        setTitle('');
        setCategory('Tech');
    }

    return(
        <>
        {
        !isSubmitted ? 
        <SafeAreaView style={{backgroundColor:'black',flex:1}}>        
            <View style={{width:'90%',alignSelf:'center',alignItems:'flex-start',justifyContent:'space-evenly',marginBottom: 60,flex:1}}>    
                <UserAvatar onPickImage = {e => setImage(e)} source={image && {uri: image}} style={{width:'30%', alignSelf:'center',}} imageStyle={{borderRadius:3}} />
                <View style={{width:'100%'}}>
                <Input color='white' variant='underlined' value={title} onChangeText={e => setTitle(e)} selectionColor='lightblue' style={{marginBottom:0}} maxLength={200} placeholder='Title' multiline size='lg' blurOnSubmit={true}  w='100%' alignSelf='center' />
                <Text style={{alignSelf:'flex-end',color:'white'}}>{200 - title.length}</Text>
                </View>
                <Input autoCapitalize='none' color='white' width={'100%'} placeholder='Source URL (Optional)' variant={'underlined'} value={sourceUrl} onChangeText={e => setSourceUrl(e)} selectionColor={'lightblue'} />
                <Picker style={{color:'white',width:'100%',alignSelf:'center'}} selectedValue={category} itemStyle={{color:'white'}} onValueChange={e => setCategory(e)} prompt='Select a category' dropdownIconColor='white'>
                    <Picker.Item label="Tech" value='Tech' />
                    <Picker.Item label="Science" value='Science' />
                    <Picker.Item label="Politics" value='Politics' />
                    <Picker.Item label="Sports" value="Sports" />
                    <Picker.Item label="Finance" value="Finance"/>
                </Picker>
                <Text style={{color:'white',fontSize:10}}>
                    Please note that you are submitting a suggestion for a topic.  Whether or not it is made public is at the discretion of a modetator.
                </Text>
                {
                !isLoading?
                <Button onPress={submit} variant={'ghost'} size={'lg'} width={'100%'} alignSelf={'center'}>Submit</Button>
                :
                <ActivityIndicator style={{alignSelf:'center',marginRight:20}} color={'lightblue'} size={22} />
                }
            </View>
        </SafeAreaView>
        :
        <View style={{flex:1, backgroundColor: 'black',justifyContent:'center',alignItems:'center'}}>
            <View style={{alignItems:'center',width:'90%'}}>
                <Ionicons name='checkmark-circle' color='green' size={72} />
                <Text style={{color:'white',fontSize:18,marginTop:10}}>We've received your suggestion</Text>
                <Text style={{color:'white',textAlign:'center',marginTop:10}}>Thank you for your topic suggestion.  An administrator will review your contribution and either approve or deny it for the home screen.</Text>
                <Button variant='outline' w='100%' marginTop={5} onPress={suggestAnother}>Suggest another</Button>
            </View>
        </View>
        }
        </>
    )
}

export default SuggestTopic;