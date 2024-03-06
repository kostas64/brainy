import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import dict from '../../assets/values/dict.json';
import {isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const NewGameButton = ({setNewGame}) => {
  return (
    <Touchable
      onPress={setNewGame}
      style={[styles.container, isAndroid && styles.height]}>
      <Text style={styles.label}>{dict.newGameLabel}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: DimensionsUtils.getDP(24),
    paddingVertical: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(12),
    backgroundColor: Colors.tabBarBg,
    justifyContent: 'flex-end',
  },
  label: {
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(24),
    color: Colors.white,
    alignSelf: 'center',
  },
  height: {
    height: DimensionsUtils.getDP(58),
  },
});

export default NewGameButton;
