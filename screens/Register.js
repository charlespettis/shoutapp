import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Platform, ImageBackground} from 'react-native';
import {Text, Button, Input, Stack, Icon, Divider, FormControl} from 'native-base';
import Logo from '../components/common/Logo';
import {Ionicons} from '@expo/vector-icons';
import {UserContext} from '../components/contexts/UserProvider';
import {checkCredentials} from '../api/user';

const Register = ({navigation}) => {
    const [isPasswordShown, setIsPasswordShown] = React.useState(true);
    const [userDetails, setUserDetails] = React.useState({
        username: '',
        email: '',
        password: ''
    })
    const {userFunctions, userState}  = React.useContext(UserContext);

    const createAccount = () => {

        if(userDetails.username.length < 4){
            alert('Please enter a valid username atleast 4 characters long');
            return;
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)){
            alert('Please enter a valid email');
            return;
        }
        if(!/^(?=.*\d).{6,}$/.test(userDetails.password)){
            alert('Please enter a password with atleast 8 digits including uppercase, lowercase, a number, and special character.');
            return;
        }

        checkCredentials(userDetails.username, userDetails.email)
        .then(res => {
            switch(res.status){
                case 200:
                    userFunctions.updateUserInfo(userDetails);
                    navigation.navigate('EditUserDetails', {
                        id:1,
                    })
                    break;
                case 403:
                    alert('Account with username or email already exists')
                    break;
                default:
                    alert('Something went wrong. Please try again later.')
                    break;
            
            }
        })

    }

    return(
        <ImageBackground 
        style={{flex:1}}
        source={{uri:'https://cdn.pixabay.com/photo/2014/06/16/23/39/black-370118_960_720.png'}}>
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
                value={userDetails.username}
                onChangeText={e => setUserDetails({
                    ...userDetails,
                    username:e
                })}
                size='lg'
                color='white'
                w={{base:'90%', md:'25%'}}
                placeholder="Username"
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
                value={userDetails.email}
                onChangeText={e => setUserDetails({
                    ...userDetails,
                    email:e
                })}
                w={{base:'90%', md:'25%'}}
                placeholder="Email"
                autoCapitalize={'none'}
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
                    size={5}
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
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});  

export default Register;