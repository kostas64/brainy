import React from 'react';
import {ImageBackground, StatusBar, StyleSheet} from 'react-native';

const BackgroundWrapper = ({children, statusBar, source}) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={statusBar}
      />
      <ImageBackground
        style={styles.container}
        source={source}
        resizeMode="cover">
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

export default BackgroundWrapper;
