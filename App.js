import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MemoryBoard from './src/components/cardMemory/MemoryBoard';

function App() {
  return (
    <SafeAreaProvider>
      <MemoryBoard />
    </SafeAreaProvider>
  );
}

export default App;
