import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView} from 'react-native';
import Feed from '../screens/Feed';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
    return(
    <SafeAreaView style={{flex:1,backgroundColor:'#444B49'}}>
        <Tab.Navigator initialRouteName="Latest" screenOptions={{ tabBarInactiveTintColor:'white',tabBarActiveTintColor:'white', tabBarStyle:{backgroundColor:'#444B49'}, tabBarScrollEnabled:true}}>
            <Tab.Screen component={Feed} name="Latest"/>
            <Tab.Screen component={Feed} name="Tech" />
            <Tab.Screen component={Feed} name="Science" />
            <Tab.Screen component={Feed} name="Politics" />
            <Tab.Screen component={Feed} name="Sports" />
        </Tab.Navigator>
    </SafeAreaView>
    )
}

export default Home;