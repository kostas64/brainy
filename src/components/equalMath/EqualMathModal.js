import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {DimensionsUtils} from '../../utils/DimensionUtils';

const EqualMathModal = ({correct, total, points}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bravo !!!</Text>
      <Text style={styles.resultsLabel}>{`Points: ${points}`}</Text>
      <Text style={styles.resultsLabel}>{`${correct}/${total}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: DimensionsUtils.getDP(12),
    marginHorizontal: DimensionsUtils.getDP(16),
    alignItems: 'center',
  },
  label: {
    color: 'black',
    fontSize: DimensionsUtils.getFontSize(26),
    fontFamily: 'Poppins-Bold',
    padding: DimensionsUtils.getDP(4),
    marginBottom: DimensionsUtils.getDP(16),
  },
  resultsLabel: {
    color: 'black',
    fontSize: DimensionsUtils.getFontSize(22),
    fontFamily: 'Poppins-Medium',
    padding: DimensionsUtils.getDP(4),
  },
});

export default EqualMathModal;
