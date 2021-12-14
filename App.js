import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import UserProvider from './components/contexts/UserProvider';
import RootNavigator from './stacks/Root';
import TopicsProvider from './components/contexts/TopicsProvider';
import PostsProvider from './components/contexts/PostsProvider';
const App = () => {

  LogBox.ignoreAllLogs();
  
  return (
    <UserProvider>
      <PostsProvider>
        <TopicsProvider>
        <StatusBar barStyle='light-content' />
            <NativeBaseProvider>
              <RootNavigator />
            </NativeBaseProvider>
        </TopicsProvider>
      </PostsProvider>
    </UserProvider>
  );
}

export default App;
