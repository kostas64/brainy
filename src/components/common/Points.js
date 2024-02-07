import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Points = ({points}) => {
  return (
    <View
      style={[
        styles.counterContainer,
        isAndroid && {height: DimensionsUtils.getDP(50)},
      ]}>
      <Text
        style={styles.counterLabel}>{`${dict.pointsLabel}: ${points} `}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    paddingHorizontal: DimensionsUtils.getDP(12),
    paddingVertical: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(8),
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.appGreen,
  },
  counterLabel: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
  },
});

export default Points;
