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
    flex: 1,
    top: -12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: Colors.appGreen,
    fontSize: DimensionsUtils.getFontSize(18),
    fontFamily: 'Poppins-Medium',
  },
});
