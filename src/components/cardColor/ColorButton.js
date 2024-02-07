/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Pressable, StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../../utils/Colors';
import {isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const {width: WIDTH} = Dimensions.get('window');

const ColorButton = ({onPress, disabled, label, insets}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        isAndroid && {height: DimensionsUtils.getDP(58)},
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
    backgroundColor: Colors.white,
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
    color: Colors.black,
    alignSelf: 'center',
  },
});

export default ColorButton;
