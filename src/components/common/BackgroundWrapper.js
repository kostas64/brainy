import React from 'react';
import FastImage from 'react-native-fast-image';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const {width, height} = Dimensions.get('window');
const image = require('../../assets/images/splash.png');

const BackgroundWrapper = ({statusBar}) => {
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={statusBar} />
      <View style={styles.background} />
      <FastImage
        source={image}
        resizeMode="cover"
        style={styles.splashTopLeft}
      />
      <FastImage
        source={image}
        resizeMode="cover"
        style={styles.splashTopRight}
      />
      <FastImage
        source={image}
        resizeMode="cover"
        style={styles.splashMiddleLeft}
      />
      <FastImage
        source={image}
        resizeMode="cover"
        style={styles.splashMiddleLeft2}
      />
      <FastImage
        source={image}
        resizeMode="cover"
        style={styles.splashBottomRight}
      />
      <FastImage
        source={image}
        resizeMode="cover"
        style={styles.splashBottomLeft}
      />
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width,
    height,
    backgroundColor: Colors.background,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  splashTopLeft: {
    position: 'absolute',
    left: DimensionsUtils.getDP(-68),
    top: DimensionsUtils.getDP(-48),
    width: DimensionsUtils.getDP(196),
    height: DimensionsUtils.getDP(196),
  },
  splashTopRight: {
    position: 'absolute',
    right: DimensionsUtils.getDP(-16),
    top: '8%',
    width: DimensionsUtils.getDP(128),
    height: DimensionsUtils.getDP(128),
    transform: [{rotate: '90deg'}],
  },
  splashMiddleLeft: {
    position: 'absolute',
    left: '28%',
    top: '20%',
    width: DimensionsUtils.getDP(184),
    height: DimensionsUtils.getDP(264),
    transform: [{rotate: '270deg'}],
  },
  splashMiddleLeft2: {
    position: 'absolute',
    left: DimensionsUtils.getDP(-24),
    top: '52%',
    width: DimensionsUtils.getDP(164),
    height: DimensionsUtils.getDP(216),
    transform: [{rotate: '180deg'}],
  },
  splashBottomLeft: {
    position: 'absolute',
    left: DimensionsUtils.getDP(-24),
    bottom: 0,
    width: DimensionsUtils.getDP(96),
    height: DimensionsUtils.getDP(96),
    transform: [{rotate: '450deg'}],
  },
  splashBottomRight: {
    position: 'absolute',
    right: DimensionsUtils.getDP(-56),
    bottom: 0,
    width: DimensionsUtils.getDP(164),
    height: DimensionsUtils.getDP(264),
    transform: [{rotate: '145deg'}],
  },
});

export default BackgroundWrapper;
