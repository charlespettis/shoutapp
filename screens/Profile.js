import React from 'react';
import {SafeAreaView,ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {List, ListItem} from '../components/list';
import {UserContext} from '../components/contexts/UserProvider';
import UserAvatar from '../components/common/UserAvatar';

const Profile = ({navigation, route}) => {

    const { userFunctions, userState } = React.useContext(UserContext);

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'black',alignItems:'center'}}>
            <ScrollView style={{flex:1,width:'100%',marginTop:20}} contentContainerStyle={{alignItems:'center',paddingBottom:20}}>

                <UserAvatar
                onPickImage = {() => alert('ree')}
                />

                <Text style={{color:'white',fontSize:24,marginTop:20}}>{userState.fullName}</Text>
            
                <TouchableOpacity>
                    <Text style={styles.text}>{userState.jobTitle}</Text>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => navigation.navigate('EditUserDetails', {id:1})}>
                    <Text style={[styles.text, !userState.company  && {color:'lightblue',opacity:.9}]}>
                    {userState.company ? userState.company : 'Add your company'}
                    </Text>
                </TouchableOpacity>

                <View style={{alignItems:'flex-start',width:'90%',marginTop:20}}>
                    <Text style={{color:'white',opacity:.5}}>ABOUT ME</Text>
                    <TouchableOpacity>
                        <Text style={[styles.text, !userState.bio && {color:'lightblue',opacity:.9}]}>{userState.bio ? userState.bio : 'Add a bio'}</Text>
                    </TouchableOpacity>
                </View>

                <List title="Account">
                    <ListItem onPress={()=>alert('hi')} icon="star" title="Liked Posts"/>
                    <ListItem onPress={()=>alert('hi')} icon="chatbubble" title="Recent Posts"/>
                    <ListItem onPress={()=>alert('hi')} icon="lock-closed-outline" title="Reset Password"/>
                    <ListItem onPress={()=>userFunctions.logOut()} icon="arrow-back" title="Log Out"/>
                </List>

                <List title="Support">
                    <ListItem onPress={()=>alert('hi')} icon="alert" title="Report A Problem"/>
                    <ListItem onPress={()=>alert('hi')} icon="reader-outline" title="Privacy Policy"/>
                    <ListItem onPress={()=>alert('hi')} icon="document-outline" title="Terms of Service"/>
                    <ListItem onPress={()=>alert('hi')} icon="help-outline" title="Help Center"/>
                </List>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        color:'white',
        marginTop:10
    }
})

export default Profile;