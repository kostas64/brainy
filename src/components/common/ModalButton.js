import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const ModalButton = ({label, onPress = () => {}}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default ModalButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: DimensionsUtils.getDP(8),
    width: WIDTH - DimensionsUtils.getDP(32),
    paddingVertical: 12,
    backgroundColor: Colors.tabBarIcon,
  },
  label: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
