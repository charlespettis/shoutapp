import React from 'react';
import {SafeAreaView,ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import Skiier from '../assets/images/skiing.jpg';
import {List, ListItem} from '../components/list';

const Profile = () => {
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#1D201F',alignItems:'center'}}>
            <ScrollView style={{flex:1,width:'100%'}} contentContainerStyle={{alignItems:'center',paddingBottom:20}}>
            <Image source={Skiier} style={{width:125,height:125,borderRadius:100,marginTop:20}} resizeMode='cover'/>
            <Text style={{color:'white',fontSize:24,marginTop:20}}>Anika Bodanika</Text>
            <Text style={styles.text}>Software Developer</Text>
            <Text style={styles.text}>Shout, LLC.</Text>
            
            <View style={{alignItems:'flex-start',width:'90%',marginTop:20}}>
            <Text style={{color:'white',opacity:.5}}>ABOUT ME</Text>
            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac nulla eu ipsum fringilla accumsan. </Text>
            </View>

            <List title="Account">
                <ListItem onPress={()=>alert('hi')} icon="star" title="Liked Posts"/>
                <ListItem onPress={()=>alert('hi')} icon="chatbubble" title="Recent Posts"/>
                <ListItem onPress={()=>alert('hi')} icon="lock-closed-outline" title="Reset Password"/>
                <ListItem onPress={()=>alert('hi')} icon="arrow-back" title="Log Out"/>
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
        marginTop:5
    }
})

export default Profile;