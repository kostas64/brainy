import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import FastImage from 'react-native-fast-image';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Header = ({insets}) => {
  return (
    <View
      style={[
        styles.container,
        {
          top: insets.top > 0 ? insets.top : DimensionsUtils.getDP(24),
        },
      ]}>
      <View style={styles.innerContainer}>
        <FastImage
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.label}>Brainy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: DimensionsUtils.getDP(16),
    paddingHorizontal: DimensionsUtils.getDP(12),
  },
  logo: {
    width: DimensionsUtils.getDP(48),
    height: DimensionsUtils.getDP(72),
  },
  label: {
    color: '#8ada4d',
    marginLeft: DimensionsUtils.getDP(12),
    fontSize: DimensionsUtils.getFontSize(28),
    fontFamily: 'Poppins-Bold',
  },
});

export default Header;
