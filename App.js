/* eslint-disable react-native/no-inline-styles */

//Libs
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

//Router
import Router from './src/routes/Router';
import {AuthProvider} from './src/context/AuthProvider';
import {ModalProvider} from './src/context/ModalProvider';
import {ToastProvider} from './src/context/ToastProvider';
import {onNavigationReady} from './src/utils/GenericUtils';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <AuthProvider>
          <ToastProvider>
            <ModalProvider>
              <Router onNavigationReady={onNavigationReady} />
            </ModalProvider>
          </ToastProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
