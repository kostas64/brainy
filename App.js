//Libs
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//Games
import ColorMatch from './src/components/cardColor/ColorMatch';
import MemoryBoard from './src/components/cardMemory/MemoryBoard';

function App() {
  React.useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 300});
  });

  return (
    <SafeAreaProvider>
      <ColorMatch />
      {/* <MemoryBoard /> */}
    </SafeAreaProvider>
  );
}

export default App;
