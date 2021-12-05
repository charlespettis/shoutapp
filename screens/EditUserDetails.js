import React, { useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, View} from 'react-native';
import {Input, Box, Button, Text, Stack} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {UserContext} from '../components/contexts/UserProvider';
import UserAvatar from '../components/common/UserAvatar';

const EditUserDetails = ({navigation, route}) => {
    const {userFunctions, userState} = useContext(UserContext)
    const [inputValue, setInputValue] = React.useState(null);
    const id = route.params.id;

    const submit = () => {
        if(flow[id].onContinue){
            userFunctions.updateUserInfo(
                {
                    [flow[id]['field']]: inputValue
                }
            )
            flow[id].onContinue(navigation);
        } else {
            userFunctions.createAccount();
        }
        
    }

    return(
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
                autoCapitalize='words'
                color='white'
                width="90%"
            />
            :
            <UserAvatar/> 
            
            }
            <Button 
                variant='outline'
                width='90%'
                mt='5'
                onPress={submit}
            >
                Continue
            </Button>
            {
            flow[id]['isSkippable'] &&
            <Button
            width='90%'
            mt='5'
            variant='ghost'>
                Skip
            </Button> 
            }
            </Stack>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#171717',
      alignItems: 'center',
      justifyContent: 'center',
    },
});  

const flow = {
    1 : {
        title: 'Enter your full name',
        field:'fullName',
        example: 'Kilgore Trout',
        onContinue: navigation => navigation.navigate('EditUserDetails', { id: 2 })
    },
    2: {
        title: 'Enter your professional title',
        field:'jobTitle',
        example: 'Journalist, Barista, Programmer',
        onContinue: navigation => navigation.navigate('EditUserDetails', { id: 3 })
    },
    3: {
        title: 'Add a profile picture',
        field: 'avatar',
        isSkippable: true,
        editAvatar: true
    }
}
export default EditUserDetails;