import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import ViewTopic from '../screens/ViewTopic';
import MainTabNavigator from '../stacks/Main';
import LandingStack from '../stacks/Landing';
import {UserContext} from '../components/contexts/UserProvider';
import ViewUserProfile from '../screens/ViewUserProfile';
import GlobalPlayerProvider from '../components/contexts/GlobalPlayerProvider';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TermsAndConditions from '../screens/TermsAndConditions';
import { View, StatusBar, Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

  const {userFunctions, userState}  = React.useContext(UserContext);
  
  return(
      <NavigationContainer>
        <GlobalPlayerProvider>
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
            <Stack.Screen
            name="ViewUserProfile"
            component={ViewUserProfile}
            />
            </>
            }
            <Stack.Screen
            name='PrivacyPolicy'
            component={PrivacyPolicy}
            />
            <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
            />
          </Stack.Navigator>

          </GlobalPlayerProvider>
      </NavigationContainer>
    )
}

export default RootNavigator;