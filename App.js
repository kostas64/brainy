//Libs
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//Router
import Router from './src/routes/Router';

function App() {
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
