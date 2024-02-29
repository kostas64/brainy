import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../../utils/Colors';
import {DimensionsUtils} from '../../../utils/DimensionUtils';

const MathIcon = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>%</Text>
    </View>
  );
};

export default MathIcon;

const styles = StyleSheet.create({
  container: {
    width: DimensionsUtils.getDP(24),
    height: DimensionsUtils.getDP(24),
    borderRadius: DimensionsUtils.getDP(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  label: {
    top: 1,
    color: Colors.appGreen,
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(13),
  },
});
