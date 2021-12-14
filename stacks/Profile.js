import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import EditUserDetails from '../screens/EditUserDetails';
import ViewSuggestedTopics from '../screens/ViewSuggestedTopics';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Profile">
            <Stack.Screen 
            name="Profile" 
            component={Profile} 
            options={{tabBarIcon: ({color,size}) => <Ionicons name="person-outline" color={color} size={size}/>}}            
            />
          <Stack.Screen name="EditUserDetails" component={EditUserDetails} />
          <Stack.Screen name="ViewSuggestedTopics" component={ViewSuggestedTopics} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator;