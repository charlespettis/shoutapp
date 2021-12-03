import React from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Text, Button, Input, Stack, Icon, Divider} from 'native-base';
import Logo from '../components/common/Logo';
import {Ionicons} from '@expo/vector-icons';

const Login = ({navigation}) => {
    const [isPasswordShown, setIsPasswordShown] = React.useState(true);
    const [userDetails, setUserDetails] = React.useState({
        userName: '',
        email: '',
        password: ''
    })

    const login = () => {
        navigation.navigate('Main')
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
            w='100%' 
            alignItems='center'>
                <Input 
                color
                value={userDetails.userName}
                onChangeText={e => setUserDetails({
                    ...userDetails,
                    userName:e
                })}
                size='lg'
                color='white'
                autoFocus
                w={{base:'90%', md:'25%'}}
                placeholder="Email or Username"
                autoCapitalize={'none'}
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
                w={{base:'90%', md:'25%'}}
                placeholder="Password"
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
                    size={4}
                    mr='2'
                    as={<Ionicons onPress={() => setIsPasswordShown(!isPasswordShown)} name={isPasswordShown ? 'eye-outline' : 'eye'} />}
                />
                }/>
                <Button 
                width={'90%'} 
                onPress={login}
                variant='outline'>
                    Login
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

export default Login;