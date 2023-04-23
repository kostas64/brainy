import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MemoryBoard from './src/components/cardMemory/MemoryBoard';

function App() {
  React.useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 300});
  });

  return (
    <SafeAreaProvider>
      <MemoryBoard />
    </SafeAreaProvider>
  );
}

export default App;
