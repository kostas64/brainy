import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const NewGameButton = ({gameFinished, setNewGame}) => {
  return (
    <Pressable
      onPress={setNewGame}
      style={[
        styles.container,
        isAndroid && {height: DimensionsUtils.getDP(58)},
      ]}>
      <Text style={styles.label}>
        {gameFinished ? dict.playAgainLabel : dict.newGameLabel}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: DimensionsUtils.getDP(24),
    paddingVertical: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(12),
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.appGreen,
    justifyContent: 'flex-end',
  },
  label: {
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(24),
    color: Colors.white,
    alignSelf: 'center',
  },
});

export default NewGameButton;
