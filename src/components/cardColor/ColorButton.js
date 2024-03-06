/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import {WIDTH, isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const ColorButton = ({
  label,
  insets,
  onPress,
  disabled,
  labelStyle,
  containerStyle,
}) => {
  return (
    <Touchable
      onPress={onPress}
      disabled={disabled}
      pressingAnimationDuration={75}
      releasingAnimationDuraiton={75}
      style={[
        styles.buttonContainer,
        containerStyle,
        isAndroid && {height: DimensionsUtils.getDP(58)},
        {
          opacity: disabled ? 0.4 : 1,
          marginBottom:
            insets.bottom > 0 ? insets.bottom : DimensionsUtils.getDP(16),
        },
      ]}>
      <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.tabBarBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: DimensionsUtils.getDP(12),
    marginHorizontal: DimensionsUtils.getDP(16),
    width: WIDTH / 2 - DimensionsUtils.getDP(32),
    paddingVertical: DimensionsUtils.getDP(8),
  },
  buttonLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(24),
    color: Colors.white,
    alignSelf: 'center',
  },
});

export default ColorButton;
