import React from 'react';
import { Pressable} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import { View, Text } from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import ViewTopic from '../screens/ViewTopic';
import Profile from '../screens/Profile';
import Search from '../screens/Search';

const Tab = createBottomTabNavigator()

const MainTabNavigator = () => {
    return(
        <Tab.Navigator initialRouteName="Home" screenOptions={{ tabBarStyle:{borderTopWidth:0},headerShown:false,tabBarShowLabel:false,tabBarInactiveBackgroundColor:'#444B49',tabBarActiveBackgroundColor:'#444B49', tabBarInactiveTintColor:'white'}}>
            <Tab.Screen name="Home" 
            component={Home} 
            options={{tabBarIcon: ({color,size}) => <Ionicons name="home-outline" color={color} size={size}/>}} 
            />
            <Tab.Screen 
            name="Explore" 
            component={HomeScreen} 
            options={{tabBarIcon: ({color,size}) => <Ionicons name="add-circle-outline" color={color} size={size}/>}}
            />
            <Tab.Screen 
            name="Search" 
            component={Search} 
            options={{tabBarIcon: ({color,size}) => <Ionicons name="search-outline" color={color} size={size}/>}}
            />
            <Tab.Screen 
            name="Profile" 
            component={Profile} 
            options={{tabBarIcon: ({color,size}) => <Ionicons name="person-outline" color={color} size={size}/>}}            
            />

        </Tab.Navigator>
    )
}

const HomeScreen = () => {
    return(
        <View style={{flex:1}}>
            <Text>Hello</Text>
        </View>
    )
}

export default MainTabNavigator;
