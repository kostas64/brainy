import React from 'react';
import FastImage from 'react-native-fast-image';
import {Dimensions, StatusBar, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const BackgroundWrapper = ({statusBar, source}) => {
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={statusBar} />
      <FastImage
        source={source}
        resizeMode="cover"
        style={{position: 'absolute', top: 0, left: 0, width, height}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BackgroundWrapper;
