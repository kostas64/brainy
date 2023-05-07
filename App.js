//Libs
import React from 'react';
import {LogBox} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//Router
import Router from './src/routes/Router';

function App() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  React.useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 300});
  });

  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  );
}

export default App;
