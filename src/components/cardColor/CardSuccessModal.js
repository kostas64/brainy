import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {GenericUtils} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const CardSuccessModal = ({correct, tries, points}) => {
  return (
    <View style={styles.successContainer}>
      <Text style={styles.label}>Bravo !!!</Text>
      <Text style={styles.resultsLabel}>{`Points: ${points}`}</Text>
      <Text style={styles.resultsLabel}>{`${correct}/${tries}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  successContainer: {
    padding: DimensionsUtils.getDP(12),
    marginHorizontal: DimensionsUtils.getDP(16),
    alignItems: 'center',
  },
  label: {
    color: 'black',
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: GenericUtils.fontFamily(),
    padding: DimensionsUtils.getDP(4),
    marginBottom: DimensionsUtils.getDP(16),
  },
  resultsLabel: {
    color: 'black',
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: GenericUtils.fontFamily(),
    padding: DimensionsUtils.getDP(4),
  },
});

export default CardSuccessModal;
