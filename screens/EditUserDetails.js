import React, { useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Platform, ActivityIndicator} from 'react-native';
import {Input, Box, Button, Text, Stack} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {UserContext} from '../components/contexts/UserProvider';
import UserAvatar from '../components/common/UserAvatar';

const EditUserDetails = ({navigation, route}) => {
    const {userFunctions, userState} = useContext(UserContext)
    const [inputValue, setInputValue] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const id = route.params.id;

    const submit = () => {
        if(!flow[id].isSkippable && !inputValue && !flow[id].editAvatar){
            alert('Please fill out the field completely.')
            return;
        } else {
            if(flow[id].onContinue){
                userFunctions.updateUserInfo(
                    {
                        [flow[id]['field']]: inputValue
                    }
                )
                setInputValue(null);
                flow[id].onContinue({navigation: navigation, userFunctions: userFunctions, inputValue: inputValue});
            } else {
                setIsLoading(true)
                userFunctions.createAccount()
            }
        }
    }

    return(
        <View style={{flex:1,backgroundColor:'black'}}>
    <KeyboardAvoidingView style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <Stack
            space={4}  
            w='100%' 
            alignItems='center'
        
        >
            <Ionicons 
                name='chevron-back'
                size={32}
                onPress={() => navigation.goBack()}
                color='white'
                style={{alignSelf:'flex-start', marginLeft:10,marginBottom:50}}
            />
            <Text
                color='white'
                alignSelf='flex-start'
                ml='5'
                fontSize='lg'
                mb='5'
            >
                {flow[id]['title']}
            </Text>
            {

            !flow[id]['editAvatar'] ? 
            <Input
                variant='underlined'
                placeholder={flow[id]['example']}
                autoFocus
                selectionColor='lightblue'
                size='lg'
                value={inputValue}
                onChangeText= {e => setInputValue(e)}
                autoCapitalize={flow[id]['multiline'] ? 'sentences' : 'words'}
                color='white'
                width="90%"
                multiline={flow[id]['multiline']}
                maxHeight={100}
            />
            :
            <UserAvatar
            onPickImage = {e => {
                setImage(e);
                userFunctions.updateUserInfo({
                    avatar: e
                })
            }}
            source = { image && {uri: image} }
            /> 
            
            }
            {
                !isLoading ? 
            <Button 
                variant='ghost'
                width='90%'
                mt='5'
                onPress={submit}
            >
                Continue
            </Button>
            :
            <ActivityIndicator style={{marginTop:20}} color={'lightblue'}/>
            }
            {
            flow[id]['isSkippable'] &&
            <Button
            width='90%'
            mt='5'
            onPress={() => {
                setInputValue(null);
                if(flow[id].onContinue){
                    flow[id].onContinue({navigation: navigation, userFunctions: userFunctions, inputValue: inputValue});
                } else {
                    userFunctions.createAccount()
                }
            }}
            variant='ghost'>
                Skip for now
            </Button> 
            }
            </Stack>
            </KeyboardAvoidingView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
});  

const flow = {
    1 : {
        title: 'Enter your full name',
        field:'fullName',
        example: 'Kilgore Trout',
        onContinue: ({navigation}) => navigation.navigate('EditUserDetails', { id: 2 })
    },
    2: {
        title: 'Enter your professional title',
        field:'jobTitle',
        example: 'Journalist, Barista, Programmer',
        onContinue: ({navigation}) => navigation.navigate('EditUserDetails', { id: 3 })
    },
    3: {
        title: 'Add a profile picture',
        field: 'avatar',
        editAvatar: true
    },
    4: {
        title: "Edit your profile picture",
        field: 'avatar',
        isSkippable: false,
        editAvatar: true
    },
    'profile-company': {
        title: "Edit your company",
        field: 'company',
        example: 'The Popcorn Factory',
        onContinue: ({userFunctions, navigation, inputValue}) => {
            userFunctions.editUserDetails({'company': inputValue});
            navigation.goBack();
        }
    },
    'profile-jobTitle': {
        title: "Edit your job title",
        field: 'jobTitle',
        example: 'Journalist, Barista, Programmer',
        onContinue: ({userFunctions, navigation, inputValue}) => {
            userFunctions.editUserDetails({'jobTitle': inputValue});
            navigation.goBack();
        }
    },
    'profile-bio': {
        title: "Edit your bio",
        field: 'bio',
        multiline: true,
        example: 'I like long walks on the beach and talking about current events 😋',
        onContinue: ({userFunctions, navigation, inputValue}) => {
            userFunctions.editUserDetails({'bio': inputValue});
            navigation.goBack();
        }
    }


}
export default EditUserDetails;