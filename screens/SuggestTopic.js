import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Input, Button, Text} from 'native-base';
import UserAvatar from '../components/common/UserAvatar';

const SuggestTopic = () => {
    const [category, setCategory] = React.useState('Select one...');

    return(
        <SafeAreaView style={{backgroundColor:'#1D201F',flex:1}}>        
            <View style={{width:'90%',alignSelf:'center',alignItems:'flex-start',justifyContent:'center',flex:1}}>    
                <Text style={{color:'white',fontSize:22,marginBottom:20}}>Suggest A Topic</Text>
                <UserAvatar style={{width:'30%', alignSelf:'flex-start',marginBottom:10}}/>
                <Input selectionColor='lightblue' maxLength={200} placeholder='Title' multiline size='lg' blurOnSubmit={true} placeholderTextColor='white' color='white' w='100%' alignSelf='center' />
                
                <Picker style={{color:'white',width:'100%',alignSelf:'center'}} selectedValue={category} itemStyle={{color:'white'}} onValueChange={e => setCategory(e)} prompt='Select a category' dropdownIconColor='white'>
                    <Picker.Item label="Tech" value='Tech' />
                    <Picker.Item label="Science" value='Science' />
                    <Picker.Item label="Politics" value='Politics' />
                    <Picker.Item label="Sports" value="Sports" />
                </Picker>
                <Button variant='outline' width='100%' alignSelf='center'>Submit</Button>
            </View>
        </SafeAreaView>
    )
}

export default SuggestTopic;