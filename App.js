//Libs
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//Router
import Router from './src/routes/Router';
import {GenericUtils} from './src/utils/GenericUtils';
import {AuthProvider} from './src/context/AuthProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <AuthProvider>
          <Router onNavigationReady={GenericUtils.onNavigationReady} />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
