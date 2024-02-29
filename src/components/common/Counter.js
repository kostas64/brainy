import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Counter = ({counter}) => {
  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counter}>{counter}</Text>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  counterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    minWidth: 22,
    backgroundColor: Colors.fillRed,
    padding: 4,
    borderRadius: DimensionsUtils.getDP(50),
  },
  counter: {
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: DimensionsUtils.getFontSize(10),
    paddingHorizontal: DimensionsUtils.getDP(2),
  },
});
