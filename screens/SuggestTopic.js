import React from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Input, Button, Text} from 'native-base';
import UserAvatar from '../components/common/UserAvatar';
import {Ionicons} from '@expo/vector-icons';

const SuggestTopic = () => {
    const [category, setCategory] = React.useState('Select one...');
    const [title, setTitle] = React.useState('');

    return(
        <SafeAreaView style={{backgroundColor:'#1D201F',flex:1}}>        
            <View style={{width:'90%',alignSelf:'center',alignItems:'flex-start',justifyContent:'space-evenly',flex:1}}>    
                <Text style={{color:'white',fontSize:22,}}>Suggest A Topic</Text>
                <UserAvatar style={{width:'30%', alignSelf:'center',}}/>
                <View style={{width:'100%'}}>
                <Input value={title} onChangeText={e => setTitle(e)} selectionColor='lightblue' style={{marginBottom:0}} maxLength={200} placeholder='Title' multiline size='lg' blurOnSubmit={true} placeholderTextColor='white' color='white' w='100%' alignSelf='center' />
                <Text style={{alignSelf:'flex-end',color:'white'}}>{200 - title.length}</Text>
                </View>

                <Picker style={{color:'white',width:'100%',alignSelf:'center'}} selectedValue={category} itemStyle={{color:'white'}} onValueChange={e => setCategory(e)} prompt='Select a category' dropdownIconColor='white'>
                    <Picker.Item label="Tech" value='Tech' />
                    <Picker.Item label="Science" value='Science' />
                    <Picker.Item label="Politics" value='Politics' />
                    <Picker.Item label="Sports" value="Sports" />
                </Picker>

                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',alignSelf:'flex-end'}}>
                    <Text style={{fontSize:18, color:'lightblue'}}>Submit</Text>
                    <Ionicons name='chevron-forward' size={32} color='lightblue' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SuggestTopic;