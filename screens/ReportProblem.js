import React from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import {Input, Button} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { sendFeedback } from '../api/user';

const ReportProblem = ({navigation,route}) => {
    const [feedback, setFeedback] = React.useState("");

    const submit = () => {
        sendFeedback({feedback: feedback})
        .then(res => {
            if(res.status === 200){
                Alert.alert(
                    "Success",
                    "We have received your input. Thank you very much for continuing to use Topic.",
                    [
                      { text: "OK", onPress: () => navigation.goBack() }
                    ]
                  );
            } else {
                Alert.alert(
                    "Error",
                    "There's been a problem submitting your feedback. Please try again later.",
                    [
                      { text: "OK", onPress: () => navigation.goBack() }
                    ]
                  );

            }
        })
    }

    return(
    <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
        <View style={{margin:20,height:'50%',justifyContent:'space-evenly'}}>
        <Ionicons name='chevron-back' size={22} onPress={()=>navigation.goBack()} color={'white'}/>
        <Text style={{fontSize:22,color:'white'}}>Report An Issue</Text>
        <Text style={{color:'white',lineHeight:22,fontWeight:'300',marginTop:10}}>We're sorry you're having an issue and thank you for bringing it to our attention.  Please describe in detail the issue you're facing and someone on our team will look into addressing it as soon as possible.</Text>
        <Input value={feedback} onChangeText={e => setFeedback(e)} multiline variant='underlined' autoFocus color='white' selectionColor={'lightblue'} placeholderTextColor={'rgba(255,255,255,.5)'} placeholder='Please describe your issue...'/>
        <Button alignSelf={'flex-end'} onPress={submit} variant={'ghost'}>Submit</Button>
        </View>
    </SafeAreaView>
    )
}

export default ReportProblem;