import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Platform, Text, ActivityIndicator} from 'react-native';
import { Button, Input, Stack, Icon } from 'native-base';
import Logo from '../components/common/Logo';
import {Ionicons} from '@expo/vector-icons';
import {UserContext} from '../components/contexts/UserProvider';

const Login = ({navigation}) => {
    const {userFunctions, userState}  = React.useContext(UserContext);
    const [isPasswordShown, setIsPasswordShown] = React.useState(true);
    const [userDetails, setUserDetails] = React.useState({
        username: '',
        email: '',
        password: ''
    })

    const submit = () => {
        userFunctions.login(`${userDetails.username || userDetails.email}:${userDetails.password}`)
    }

    return(
        <KeyboardAvoidingView 
            style={styles.container}       
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Ionicons 
            name='chevron-back'
            size={32}
            onPress={() => navigation.goBack()}
            color='white'
            style={{alignSelf:'flex-start', marginLeft:10,marginBottom:50}}
        />
        <Logo style={{marginBottom:35}}/>
            <Stack 
            space={4}  
            w='90%' 
            alignItems='center'>
                <Text style={{color:'white',alignSelf:'flex-start', fontSize:22,fontWeight:'300'}}>Log In</Text>
                <Input 
                color
                selectionColor={'lightblue'}
                value={userDetails.username}
                onChangeText={e => setUserDetails({
                    ...userDetails,
                    username:e
                })}
                size='lg'
                color='white'
                autoFocus
                placeholder="Email or Username"
                autoCapitalize={'none'}
                variant={'underlined'}
                InputLeftElement={
                <Icon
                    color="white"
                    size={4}
                    ml='2'
                    as={<Ionicons name='person-outline' />}
                />
                }/>
                <Input 
                size='lg'
                color='white'
                value={userDetails.password}
                onChangeText={e => setUserDetails({
                    ...userDetails,
                    password:e
                })}
                variant={'underlined'}
                placeholder="Password"
                selectionColor={'lightblue'}
                secureTextEntry={isPasswordShown}
                InputLeftElement={
                <Icon
                    color="white"
                    size={4}
                    ml='2'
                    as={<Ionicons name='lock-closed-outline' />}
                />
                }
                InputRightElement={
                <Icon
                    color="white"
                    size={5}
                    mr='2'
                    as={<Ionicons onPress={() => setIsPasswordShown(!isPasswordShown)} name={isPasswordShown ? 'eye-outline' : 'eye'} />}
                />
                }/>
                <Button 
                width={'100%'} 
                onPress={submit}
                variant='ghost'>
                    Login
                </Button>
            </Stack>
        </KeyboardAvoidingView>
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

export default Login;