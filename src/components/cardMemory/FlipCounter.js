import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const FlipCounter = ({flipCounter}) => {
  return (
    <View style={styles.flipContainer}>
      <Text
        style={
          styles.flipLabel
        }>{`${dict.memoryCardFlipLabel}: ${flipCounter}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flipContainer: {
    height: DimensionsUtils.getDP(50),
    paddingVertical: DimensionsUtils.getDP(8),
    paddingHorizontal: DimensionsUtils.getDP(12),
    borderRadius: DimensionsUtils.getDP(8),
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  flipLabel: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
  },
});

export default FlipCounter;
