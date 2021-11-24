import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {View, SafeAreaView, Text} from 'react-native';
import Recorder from '../components/recorder';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
    return(
    <SafeAreaView style={{flex:1,backgroundColor:'#444B49'}}>
        <Tab.Navigator initialRouteName="Yee" screenOptions={{ tabBarInactiveTintColor:'white',tabBarActiveTintColor:'white', tabBarStyle:{backgroundColor:'#444B49'}, tabBarScrollEnabled:true}}>
            <Tab.Screen component={HomeSCreen} name="Latest"/>
            <Tab.Screen component={HomeSCreen} name="Tech" />
            <Tab.Screen component={HomeSCreen} name="Science" />
            <Tab.Screen component={HomeSCreen} name="Politics" />
            <Tab.Screen component={HomeSCreen} name="Sports" />
        </Tab.Navigator>
    </SafeAreaView>
    )
}

const HomeSCreen = () => {
    return(
    <View style={{flex:1,backgroundColor:'#1D201F',justifyContent:'flex-end'}}>
        <Recorder />
    </View>
    )
}

export default Home;