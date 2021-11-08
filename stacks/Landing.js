import React from 'react';
import Register from '../screens/Register';
import EditUserDetails from '../screens/EditUserDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const LandingStack = () => {
  return (
        <Stack.Navigator initialRouteName="Register" screenOptions={{headerShown:false}}>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="EditUserDetails" component={EditUserDetails} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
  );
}


export default LandingStack;
