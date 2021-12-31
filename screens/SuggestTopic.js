import React from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
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

    const submit = () => {
        if( !title || !image ) {
            alert('Please choose an image and enter a title')
        } else {
            suggestTopic({category: category, title: title, image: image})
            .then(res => {
                if(res.status === 200){
                    setIsSubmitted(true);
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
                <Text style={{color:'white',fontSize:22,fontWeight:'300'}}>Suggest A Topic</Text>
                <UserAvatar onPickImage = {e => setImage(e)} source={image && {uri: image}} style={{width:'30%', alignSelf:'center',}} imageStyle={{borderRadius:3}} />
                <View style={{width:'100%'}}>
                <Input variant='underlined' value={title} onChangeText={e => setTitle(e)} selectionColor='lightblue' style={{marginBottom:0}} maxLength={200} placeholder='Title' multiline size='lg' blurOnSubmit={true} placeholderTextColor='white' color='white' w='100%' alignSelf='center' />
                <Text style={{alignSelf:'flex-end',color:'white'}}>{200 - title.length}</Text>
                </View>

                <Picker style={{color:'white',width:'100%',alignSelf:'center'}} selectedValue={category} itemStyle={{color:'white'}} onValueChange={e => setCategory(e)} prompt='Select a category' dropdownIconColor='white'>
                    <Picker.Item label="Tech" value='Tech' />
                    <Picker.Item label="Science" value='Science' />
                    <Picker.Item label="Politics" value='Politics' />
                    <Picker.Item label="Sports" value="Sports" />
                    <Picker.Item label="Finance" value="Finance"/>
                </Picker>

                <Button onPress={submit} variant={'ghost'} size={'lg'} alignSelf={'flex-end'}>Submit</Button>

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