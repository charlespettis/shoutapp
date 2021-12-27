import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import EditUserDetails from '../screens/EditUserDetails';
import ViewSuggestedTopics from '../screens/ViewSuggestedTopics';
import ResetPassword from '../screens/ResetPassword';
import ReportProblem from '../screens/ReportProblem';
import ViewFlags from '../screens/ViewFlags';
import ViewLikes from '../screens/ViewLikes';
import ViewRecentPosts from '../screens/ViewRecentPosts';

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
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="ReportProblem" component={ReportProblem} />
          <Stack.Screen name="ViewFlags" component={ViewFlags} />
          <Stack.Screen name="ViewLikes" component={ViewLikes} />
          <Stack.Screen name="ViewRecentPosts" component={ViewRecentPosts} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator;