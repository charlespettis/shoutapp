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
    <NativeBaseProvider>
      <UserProvider>
        <PostsProvider>
          <TopicsProvider>
          <StatusBar translucent={true} barStyle='light-content' />
                <RootNavigator />
          </TopicsProvider>
        </PostsProvider>
      </UserProvider>
    </NativeBaseProvider>
  );
}

export default App;
