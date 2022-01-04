import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import {Ionicons} from '@expo/vector-icons';
import Search from '../screens/Search';
import SuggestTopic from '../screens/SuggestTopic';
import ProfileNavigator from './Profile';
import { SafeAreaView, View } from 'react-native';

const Tab = createBottomTabNavigator()

const MainTabNavigator = () => {
    return(
        <Tab.Navigator initialRouteName="Home"   screenOptions={{ tabBarHideOnKeyboard:true, tabBarStyle:{borderTopWidth:0,paddingBottom:0},headerShown:false,tabBarShowLabel:false,tabBarInactiveBackgroundColor:'#2A2A2C',tabBarActiveBackgroundColor:'#2A2A2C', tabBarInactiveTintColor:'white'}}>
            <Tab.Screen name="Home" 
            component={Home} 
            options={{tabBarIcon: ({color,size}) => <Ionicons name="home-outline" color={color} size={size}/>}} 
            />
            <Tab.Screen 
            name="Search" 
            component={Search} 
            options={{tabBarIcon: ({color,size}) => <Ionicons name="search-outline" color={color} size={size}/>}}
            />
            <Tab.Screen 
            name="Explore" 
            component={SuggestTopic} 
            options={{tabBarIcon: ({color,size}) => <Ionicons name="add-outline" color={color} size={size}/>}}
            />
            <Tab.Screen 
            name="Profile" 
            component={ProfileNavigator} 
            options={{tabBarIcon: ({color,size}) => <Ionicons name="person-outline" color={color} size={size}/>}}            
            />
        </Tab.Navigator>
    )
}

export default MainTabNavigator;

