import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>No scores yet</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: DimensionsUtils.getDP(48),
  },
  label: {
    color: Colors.appGreen,
    fontSize: DimensionsUtils.getFontSize(18),
    fontFamily: 'Poppins-Medium',
  },
});
