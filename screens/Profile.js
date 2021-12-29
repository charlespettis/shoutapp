import React from 'react';
import {SafeAreaView,ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {List, ListItem} from '../components/list';
import {UserContext} from '../components/contexts/UserProvider';
import UserAvatar from '../components/common/UserAvatar';
import {env} from '../misc';
import { GlobalPlayerContext } from '../components/contexts/GlobalPlayerProvider';
const Profile = ({navigation, route}) => {

    const { userFunctions, userState } = React.useContext(UserContext);
    const {player, playerFunctions} = React.useContext(GlobalPlayerContext);

    const logOut = () => {
        playerFunctions.stop();
        userFunctions.logOut()
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'black',alignItems:'center'}}>
            <ScrollView style={{flex:1,width:'100%',marginTop:20,}} contentContainerStyle={{alignItems:'center',paddingBottom:80}}>

                <UserAvatar
                onPickImage = {e => userFunctions.editAvatar({avatar: e})}
                source = { userState.avatar && {uri: userState.avatar} }
                />

                <Text style={{color:'white',fontSize:24,marginTop:20}}>{userState.fullName}</Text>

                <TouchableOpacity onPress={() => navigation.navigate('EditUserDetails', {id:'profile-jobTitle'})}>
                    <Text style={[styles.text, !userState.jobTitle  && {color:'lightblue',opacity:.9}]}>
                    {userState.jobTitle ? userState.jobTitle : 'Add your professional title'}
                    </Text>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => navigation.navigate('EditUserDetails', {id:'profile-company'})}>
                    <Text style={[styles.text, !userState.company  && {color:'lightblue',opacity:.9}]}>
                    {userState.company ? userState.company : 'Add your company'}
                    </Text>
                </TouchableOpacity>

                <View style={{alignItems:'flex-start',width:'90%',marginTop:20}}>
                    <Text style={{color:'white',opacity:.5}}>ABOUT ME</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EditUserDetails', {id:'profile-bio'})}>
                        <Text style={[styles.text, !userState.bio && {color:'lightblue',opacity:.9}]}>{userState.bio ? userState.bio : 'Add a bio'}</Text>
                    </TouchableOpacity>
                </View>

                <List title="Account">
                    <ListItem onPress={()=>navigation.navigate('ViewLikes')} icon="star" title="Liked Posts"/>
                    <ListItem onPress={()=>navigation.navigate('ViewRecentPosts')} icon="chatbubble" title="Recent Posts"/>
                    <ListItem onPress={()=>navigation.navigate('ResetPassword')} icon="lock-closed-outline" title="Reset Password"/>
                    <ListItem onPress={logOut} icon="arrow-back" title="Log Out"/>
                </List>

                <List title="Support">
                    <ListItem onPress={()=>navigation.navigate('ReportProblem')} icon="alert" title="Report A Problem"/>
                    <ListItem onPress={()=>navigation.navigate('PrivacyPolicy')} icon="reader-outline" title="Privacy Policy"/>
                    <ListItem onPress={()=>navigation.navigate('TermsAndConditions')} icon="document-outline" title="Terms of Service"/>
                    <ListItem onPress={()=>alert('hi')} icon="help-outline" title="Help Center"/>
                </List>

                {
                userState.admin &&

                <List title="Admin">
                    <ListItem onPress={()=>navigation.navigate('ViewSuggestedTopics')} icon="list-outline" title="View Suggested Topics"/>
                    <ListItem onPress={()=>navigation.navigate('ViewFlags')} icon="flag-outline" title="View Flagged Posts"/>
                </List>

                }

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