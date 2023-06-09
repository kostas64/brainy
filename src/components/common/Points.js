import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Points = ({insets, points}) => {
  return (
    <View
      style={[
        styles.counterContainer,
        {
          top: insets.top + 24,
        },
        Platform.OS === 'android' && {height: DimensionsUtils.getDP(50)},
      ]}>
      <Text
        style={styles.counterLabel}>{`${dict.pointsLabel}: ${points} `}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    position: 'absolute',
    left: DimensionsUtils.getDP(26),
    padding: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(138),
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  counterLabel: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
  },
});

export default Points;
