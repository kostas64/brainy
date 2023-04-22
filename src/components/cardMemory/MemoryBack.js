import React from 'react';
import {ImageBackground, StatusBar, StyleSheet} from 'react-native';

const MemoryBack = ({children}) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <ImageBackground
        style={styles.container}
        source={require('../../assets/images/background.png')}>
        {children}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MemoryBack;
