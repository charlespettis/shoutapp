import React from 'react';
import { NativeBaseProvider } from 'native-base';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingStack from './stacks/Landing';
import { LogBox, StatusBar } from 'react-native';
import UserProvider from './components/contexts/UserProvider';

const Stack = createNativeStackNavigator();

const App = () => {

  LogBox.ignoreAllLogs();

  return (
    <UserProvider>
      <StatusBar barStyle='light-content' />
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingStack}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
