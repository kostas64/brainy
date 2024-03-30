import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from '../../../utils/Colors';
import {DimensionsUtils} from '../../../utils/DimensionUtils';

const BallBalanceIcon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.hole} />
      <View style={styles.innerHole} />
      <View style={styles.ball} />
    </View>
  );
};

export default BallBalanceIcon;

const styles = StyleSheet.create({
  container: {
    width: DimensionsUtils.getDP(24),
    height: DimensionsUtils.getDP(24),
    borderRadius: DimensionsUtils.getDP(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  ball: {
    position: 'absolute',
    top: DimensionsUtils.getDP(5),
    left: DimensionsUtils.getDP(5),
    height: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(4),
    elevation: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: Colors.fillRed,
    backgroundColor: Colors.fillRed,
  },
  hole: {
    position: 'absolute',
    bottom: DimensionsUtils.getDP(4),
    right: DimensionsUtils.getDP(4),
    height: DimensionsUtils.getDP(14),
    width: DimensionsUtils.getDP(14),
    borderRadius: 7,
    backgroundColor: Colors.tabBarBg,
  },
  innerHole: {
    position: 'absolute',
    bottom: DimensionsUtils.getDP(6),
    right: DimensionsUtils.getDP(6),
    height: DimensionsUtils.getDP(10),
    width: DimensionsUtils.getDP(10),
    borderRadius: DimensionsUtils.getDP(5),
    backgroundColor: Colors.background,
  },
});
