import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';

import {Colors} from '../../utils/Colors';
import {WIDTH, isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Button = ({
  label,
  extraLabel,
  extraLabelStyle,
  onPress,
  disabled,
  labelStyle,
  containerStyle,
  loading = false,
  indicatorColor = Colors.white,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.buttonContainer, containerStyle]}>
      {loading ? (
        <ActivityIndicator size={'small'} color={indicatorColor} />
      ) : (
        <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
      )}
      {extraLabel && (
        <Text style={[styles.extraLabel, extraLabelStyle]}>{extraLabel}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    minHeight: DimensionsUtils.getDP(50),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appGreen,
    borderRadius: DimensionsUtils.getDP(12),
    width: WIDTH - DimensionsUtils.getDP(40),
  },
  buttonLabel: {
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: DimensionsUtils.getFontSize(16),
    top: isAndroid ? 1 : 0,
  },
  extraLabel: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(12),
  },
});
