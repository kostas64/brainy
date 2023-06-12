import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Points = ({points}) => {
  return (
    <View
      style={[
        styles.counterContainer,
        Platform.OS === 'android' && {height: DimensionsUtils.getDP(50)},
      ]}>
      <Text
        style={styles.counterLabel}>{`${dict.pointsLabel}: ${points} `}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    paddingLeft: DimensionsUtils.getDP(12),
    paddingVertical: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(138),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  counterLabel: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
  },
});

export default Points;
