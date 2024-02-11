import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Chevron = ({style}) => {
  return <Image source={images.arrowDown} style={[styles.chevron, style]} />;
};

export default Chevron;

const styles = StyleSheet.create({
  chevron: {
    tintColor: Colors.appGreen,
    width: DimensionsUtils.getDP(16),
    height: DimensionsUtils.getDP(16),
    transform: [{rotate: '270deg'}],
  },
});
