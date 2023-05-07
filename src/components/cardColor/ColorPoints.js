import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const ColorPoints = ({insets, points, correct, tries}) => {
  return (
    <View
      style={[
        styles.counterContainer,
        {
          top: insets.top + 24,
        },
      ]}>
      <Text
        style={styles.counterLabel}>{`${dict.pointsLabel}: ${points} `}</Text>
      <Text style={styles.counterLabel}>{`${correct}/${tries}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    position: 'absolute',
    left: DimensionsUtils.getDP(26),
    padding: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(138),
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  counterLabel: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
  },
});

export default ColorPoints;
