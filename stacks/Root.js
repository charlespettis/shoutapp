import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import ViewTopic from '../screens/ViewTopic';
import MainTabNavigator from '../stacks/Main';
import LandingStack from '../stacks/Landing';
import {UserContext} from '../components/contexts/UserProvider';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

  const {userFunctions, userState}  = React.useContext(UserContext);
  
  return(
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Landing">
            {
            !userState.isLoggedIn ? 
            <Stack.Screen
              name="Landing"
              component={LandingStack}
            />
            :
            <>
            <Stack.Screen
              name="Main"
              component={MainTabNavigator}
            />
            <Stack.Screen
            name="Topic"
            component={ViewTopic}
            />
            </>
            }
            
          </Stack.Navigator>
      </NavigationContainer>

    )
}

export default RootNavigator;