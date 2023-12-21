//Libs
import React from 'react';
import {LogBox} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//Router
import Router from './src/routes/Router';
import {AuthProvider} from './src/context/AuthProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const onNavigationReady = () => {
    RNBootSplash.hide({fade: true, duration: 300});
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <AuthProvider>
          <Router onNavigationReady={onNavigationReady} />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
