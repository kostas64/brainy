/* eslint-disable react-native/no-inline-styles */

//Libs
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//Router
import Router from './src/routes/Router';
import {GenericUtils} from './src/utils/GenericUtils';
import {AuthProvider} from './src/context/AuthProvider';
import {ModalProvider} from './src/context/ModalProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <AuthProvider>
          <ModalProvider>
            <Router onNavigationReady={GenericUtils.onNavigationReady} />
          </ModalProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
