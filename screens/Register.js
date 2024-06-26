import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Platform, ImageBackground, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Text, Button, Input, Stack, Icon, Divider, FormControl} from 'native-base';
import Logo from '../components/common/Logo';
import {Ionicons} from '@expo/vector-icons';
import {UserContext} from '../components/contexts/UserProvider';
import {checkCredentials} from '../api/user';

const Register = ({navigation}) => {
    const [isPasswordShown, setIsPasswordShown] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState({
        username: '',
        email: '',
        password: ''
    })
    const {userFunctions, userState}  = React.useContext(UserContext);

    const createAccount = () => {

        if(userDetails.username.length < 3){
            alert('Please enter a valid username atleast 4 characters long');
            return;
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)){
            alert('Please enter a valid email');
            return;
        }
        if(!/^(?=.*\d).{6,}$/.test(userDetails.password)){
            alert('Please enter a password with atleast 6 characters and one uppercase character, lowercase character and number.');
            return;
        }
        setIsLoading(true);
        checkCredentials(userDetails.username, userDetails.email)
        .then(res => {
            setIsLoading(false)
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
                <Text fontWeight={'300'} width={'90%'} color={'white'} fontSize={24} alignSelf={'center'}>Sign Up for Topic</Text>
                <Input 
                color
                variant={'underlined'}
                value={userDetails.username}
                onChangeText={e => setUserDetails({
                    ...userDetails,
                    username:e
                })}
                size='lg'
                color='white'
                selectionColor={'lightblue'}
                w={{base:'90%', md:'25%'}}
                placeholder="Username"
                autoCapitalize={'none'}
                InputLeftElement={
                <Icon
                    color="white"
                    size={4}
                    ml='2'
                    as={<Ionicons name='at' />}
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
                selectionColor={'lightblue'}
                variant={'underlined'}
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
                selectionColor={'lightblue'}
                color='white'
                variant={'underlined'}
                value={userDetails.password}
                onChangeText={e => setUserDetails({
                    ...userDetails,
                    password:e
                })}
                w={{base:'90%', md:'25%'}}
                placeholder="Password"
                autoCapitalize='words'
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
                <Text style={{color:'rgba(255,255,255,.75)',fontSize:10,width:'90%',alignSelf:'center'}}>
                    By continuing, you agree to our <Text onPress={()=>navigation.navigate('TermsAndConditions')} style={{color:'white',alignSelf:'center',fontSize:10,fontWeight:'bold'}}> Terms of Service </Text>and acknowledge that you have read our <Text onPress={()=>navigation.navigate('PrivacyPolicy')} style={{color:'white',alignSelf:'center',fontSize:10,fontWeight:'bold'}}>Privacy Policy.</Text>
                </Text>

                    {!isLoading ? 
                                    <Button 
                                    width={'90%'} 
                                    onPress={createAccount}
                                    variant='ghost'>
                    
                    Create a new account
                    </Button>
                     : <ActivityIndicator color={'lightblue'} size={22} />
                    }
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