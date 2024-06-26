import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, View } from 'react-native';
import Feed from '../screens/Feed';

const Tab = createMaterialTopTabNavigator();

const Home = () => {

    return(
    <SafeAreaView style={{flex:1,backgroundColor:'#2A2A2C'}}>
            <Tab.Navigator initialRouteName="Latest" screenOptions={{ tabBarInactiveTintColor:'white',tabBarActiveTintColor:'white', tabBarStyle:{backgroundColor:'#2A2A2C'}, tabBarScrollEnabled:true}}>
                <Tab.Screen component={Feed} name="Latest"/>
                <Tab.Screen component={Feed} name="Tech" />
                <Tab.Screen component={Feed} name="Science" />
                <Tab.Screen component={Feed} name="Politics" />
                <Tab.Screen component={Feed} name="Sports" />
                <Tab.Screen component={Feed} name="Finance" />

            </Tab.Navigator>
    </SafeAreaView>
    )
}

export default Home;