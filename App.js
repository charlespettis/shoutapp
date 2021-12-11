import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import UserProvider from './components/contexts/UserProvider';
import GlobalPlayerProvider from './components/contexts/GlobalPlayerProvider';
import RootNavigator from './stacks/Root';
import TopicsProvider from './components/contexts/TopicsProvider';
const App = () => {

  LogBox.ignoreAllLogs();
  
  return (
    <UserProvider>
      <TopicsProvider>
      <StatusBar barStyle='light-content' />
      <GlobalPlayerProvider>
        <NativeBaseProvider>
          <RootNavigator />
        </NativeBaseProvider>
      </GlobalPlayerProvider>
      </TopicsProvider>
    </UserProvider>
  );
}

export default App;
