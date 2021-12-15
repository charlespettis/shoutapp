import React from 'react';
import {View, Text, SafeAreaView, Alert,KeyboardAvoidingView} from 'react-native';
import { Input,Button } from 'native-base';
import { resetPassword } from '../api/user';
import Ionicons from '@expo/vector-icons/Ionicons';

const ResetPassword = ({navigation, route}) => {
    const [userObj, setUserObj] = React.useState({});

    const submit = () => {
        if(userObj.newPassword !== userObj.reEnterNewPassword){
            Alert.alert(
                "Error",
                "Passwords do not match",
                [
                  { text: "OK", onPress: () => {return} }
                ]
              );

        }
        resetPassword({currentPassword: userObj.currentPassword, newPassword: userObj.newPassword})
        .then(res => {
            if(res === 200){
                Alert.alert(
                    "Success",
                    "Your password was succesfully changed",
                    [
                      { text: "OK", onPress: () => navigation.goBack() }
                    ]
                  );
              
            } else {
                Alert.alert(
                    "Error",
                    "Something went wrong, please try again later.",
                    [
                      { text: "OK", onPress: () => navigation.goBack() }
                    ]
                  );

            }
        })
    }

    return(
        <KeyboardAvoidingView style={{flex:1,backgroundColor:'black',justifyContent:'center'}}>
            <View style={{height:'50%' ,width:'90%',alignSelf:'center',justifyContent:'space-evenly'}}>
                <Ionicons name='chevron-back' size={22} color={'white'} onPress={()=>navigation.goBack()}/>
                <Text style={{color:'white',fontSize:22}}>Reset Password</Text>
                <Input size='lg' color={'white'} selectionColor={'lightblue'} variant='underlined' placeholder='Current Password' onChangeText={e => setUserObj({...userObj, currentPassword: e })}/>
                <Input size='lg' color={'white'} selectionColor={'lightblue'} variant='underlined' placeholder='New Password' onChangeText={e => setUserObj({...userObj, newPassword: e })}/>
                <Input size={'lg'} color={'white'} selectionColor={'lightblue'} variant='underlined' placeholder='Re-enter New Password' onChangeText={e => setUserObj({...userObj, reEnterNewPassword: e })}/>
                <Button onPress={submit} selectionColor={'lightblue'} variant='ghost' alignSelf={'flex-end'} w={'25%'}>Submit</Button>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ResetPassword;