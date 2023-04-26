import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {GenericUtils} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const MemorySuccessModal = ({pad, duration, flipCounter, centiseconds}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bravo !!!</Text>
      <Text style={styles.resultsLabel}>{`Flips : ${flipCounter}`}</Text>
      <Text style={styles.resultsLabel}>{`${pad(duration?.minutes())}:${pad(
        duration?.seconds(),
      )}:${pad(centiseconds)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: DimensionsUtils.getDP(12),
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  label: {
    color: 'black',
    fontSize: DimensionsUtils.getFontSize(22),
    fontFamily: GenericUtils.fontFamily(),
    padding: DimensionsUtils.getDP(4),
    marginBottom: DimensionsUtils.getDP(16),
  },
  flipsLabel: {
    color: 'black',
    fontSize: DimensionsUtils.getFontSize(22),
    fontFamily: GenericUtils.fontFamily(),
    padding: DimensionsUtils.getDP(4),
  },
});

export default MemorySuccessModal;
