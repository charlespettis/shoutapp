import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import UserProvider from './components/contexts/UserProvider';
import GlobalPlayerProvider from './components/contexts/GlobalPlayerProvider';
import RootNavigator from './stacks/Root';

const App = () => {

  LogBox.ignoreAllLogs();
  
  return (
    <UserProvider>
      <StatusBar barStyle='light-content' />
      <GlobalPlayerProvider>
        <NativeBaseProvider>
          <RootNavigator />
        </NativeBaseProvider>
      </GlobalPlayerProvider>
    </UserProvider>
  );
}

export default App;
