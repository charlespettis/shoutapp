import React, { useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, View} from 'react-native';
import {Input, Box, Button, Text, Stack} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {UserContext} from '../components/contexts/UserProvider';

const EditUserDetails = ({navigation, route}) => {
    const {userFunctions, userState} = useContext(UserContext)
    const [inputValue, setInputValue] = React.useState(null);

    const submit = () => {
        userFunctions.updateUserInfo(
            {
                [route.params.field]: inputValue
            }
        )
        route.params.onContinue();
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
                {route.params.title}
            </Text>
            {

            !route.params.customComponent ? 
            <Input
                variant='underlined'
                placeholder="Full name"
                autoFocus
                size='lg'
                value={inputValue}
                onChangeText= {e => setInputValue(e)}
                autoCapitalize='words'
                color='white'
                width="90%"
            />
            :
            route.params.customComponent
            
            }
            <Button 
                variant='outline'
                width='90%'
                mt='5'
                onPress={submit}
            >
                Continue
            </Button>
            <Button
            width='90%'
            mt='5'
            variant='ghost'>
                Skip
            </Button> 
            </Stack>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1D201F',
      alignItems: 'center',
      justifyContent: 'center',
    },
});  


export default EditUserDetails;