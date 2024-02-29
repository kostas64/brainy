import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from '../../../utils/Colors';
import {DimensionsUtils} from '../../../utils/DimensionUtils';

const ColorIcon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
    </View>
  );
};

export default ColorIcon;

const styles = StyleSheet.create({
  container: {
    width: DimensionsUtils.getDP(24),
    height: DimensionsUtils.getDP(24),
    borderRadius: DimensionsUtils.getDP(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  circle: {
    width: DimensionsUtils.getDP(10),
    height: DimensionsUtils.getDP(10),
    backgroundColor: Colors.fillRed,
    borderRadius: DimensionsUtils.getDP(5),
  },
});
