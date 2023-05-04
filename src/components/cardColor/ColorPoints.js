import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
      <Text style={styles.counterLabel}>{`Points: ${points} `}</Text>
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
    backgroundColor: 'black',
    alignItems: 'center',
  },
  counterLabel: {
    color: 'white',
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
  },
});

export default ColorPoints;
