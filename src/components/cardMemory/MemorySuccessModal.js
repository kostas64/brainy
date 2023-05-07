import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const MemorySuccessModal = ({pad, duration, flipCounter, centiseconds}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{dict.bravoLabel}</Text>
      <Text
        style={
          styles.resultsLabel
        }>{`${dict.memoryCardFlipLabel} : ${flipCounter}`}</Text>
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
    alignItems: 'center',
  },
  label: {
    color: Colors.black,
    fontSize: DimensionsUtils.getFontSize(26),
    fontFamily: 'Poppins-Bold',
    padding: DimensionsUtils.getDP(4),
    marginBottom: DimensionsUtils.getDP(16),
  },
  resultsLabel: {
    color: Colors.black,
    fontSize: DimensionsUtils.getFontSize(22),
    fontFamily: 'Poppins-Medium',
    padding: DimensionsUtils.getDP(4),
  },
});

export default MemorySuccessModal;
