import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const FlipCounter = ({flipCounter}) => {
  return (
    <Text
      style={
        styles.flipLabel
      }>{`${dict.memoryCardFlipLabel}: ${flipCounter}`}</Text>
  );
};

const styles = StyleSheet.create({
  flipLabel: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
  },
});

export default FlipCounter;
