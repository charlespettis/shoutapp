import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Platform} from 'react-native';
import {Text, Button, Input, Stack, Icon, Divider} from 'native-base';
import Logo from '../components/common/Logo';
import {Ionicons} from '@expo/vector-icons';
import UserAvatar from '../components/common/UserAvatar';
import {UserContext} from '../components/contexts/UserProvider';

const Register = ({navigation}) => {
    const [isPasswordShown, setIsPasswordShown] = React.useState(true);
    const [userDetails, setUserDetails] = React.useState({
        userName: '',
        email: '',
        password: ''
    })
    const {userFunctions, userState}  = React.useContext(UserContext);

    const createAccount = () => {

        userFunctions.updateUserInfo(userDetails);

        navigation.navigate('EditUserDetails', {
            title:'Enter your full name', 
            field:'fullName',
            onContinue: () => {
                navigation.push('EditUserDetails', {
                    title: 'Enter your job title',
                    field: 'jobTitle',
                    onContinue: () => {
                        navigation.push('EditUserDetails', {
                            title:'Upload a profile picture',
                            field:'avatar',
                            customComponent: <UserAvatar/>
                        })
                    }
                })
            }
        })
    }

    return(
        <KeyboardAvoidingView 
            style={styles.container}       
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
                w={{base:'90%', md:'25%'}}
                placeholder="Username"
                autoCapitalize={false}
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
                value={userDetails.email}
                onChangeText={e => setUserDetails({
                    ...userDetails,
                    email:e
                })}
                w={{base:'90%', md:'25%'}}
                placeholder="Email"
                autoCapitalize={false}
                keyboardType='email-address'
                InputLeftElement={
                <Icon
                    color="white"
                    size={4}
                    ml='2'
                    as={<Ionicons name='mail-outline' />}
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
                onPress={createAccount}
                variant='outline'>
                    Create a new account
                </Button>
                <Divider my="2" opacity={.1}/>
                <Text fontSize='md' color="white">
                    Already have an account?
                </Text>
                <Button width='90%' variant='ghost' onPress={() => navigation.navigate('Login')}>
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

export default Register;