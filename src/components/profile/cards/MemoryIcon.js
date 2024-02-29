import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../../utils/Colors';
import {DimensionsUtils} from '../../../utils/DimensionUtils';

const MemoryIcon = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>?</Text>
    </View>
  );
};

export default MemoryIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DimensionsUtils.getDP(24),
    height: DimensionsUtils.getDP(24),
    backgroundColor: Colors.background,
    borderRadius: DimensionsUtils.getDP(4),
  },
  label: {
    top: 1,
    color: 'gold',
    fontFamily: 'Poppins-Bold',
  },
});
