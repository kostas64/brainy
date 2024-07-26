import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import dict from '../../assets/values/dict.json';
import {isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const NewGameButton = ({setNewGame}) => {
  return (
    <Touchable onPress={setNewGame} style={styles.container}>
      <Text style={styles.label}>{dict.newGameLabel}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tabBarBg,
    borderRadius: DimensionsUtils.getDP(12),
    paddingHorizontal: DimensionsUtils.getDP(24),
  },
  label: {
    fontSize: 18,
    color: Colors.white,
    alignSelf: 'center',
    top: isAndroid ? 2 : 0,
    fontFamily: 'Poppins-Bold',
  },
});

export default NewGameButton;
