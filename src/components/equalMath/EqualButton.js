/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {WIDTH, isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const EqualButton = ({disabled = false, onPress, insets, label}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          opacity: disabled ? 0.4 : 1,
          marginBottom:
            insets.bottom > 0 ? insets.bottom : DimensionsUtils.getDP(16),
        },
      ]}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tabBarBg,
    borderRadius: DimensionsUtils.getDP(12),
    marginHorizontal: DimensionsUtils.getDP(16),
    width: WIDTH - DimensionsUtils.getDP(32),
  },
  buttonLabel: {
    fontSize: 20,
    color: Colors.white,
    alignSelf: 'center',
    top: isAndroid ? 2 : 0,
    fontFamily: 'Poppins-Bold',
  },
});

export default EqualButton;
