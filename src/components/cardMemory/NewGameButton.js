import React from 'react';
import {Text, Pressable, StyleSheet, Platform} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const NewGameButton = ({gameFinished, setNewGame}) => {
  return (
    <Pressable
      onPress={setNewGame}
      style={[
        styles.container,
        Platform.OS === 'android' && {height: DimensionsUtils.getDP(64)},
      ]}>
      <Text style={styles.label}>
        {gameFinished ? dict.playAgainLabel : dict.newGameLabel}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: DimensionsUtils.getDP(12),
    borderRadius: DimensionsUtils.getDP(12),
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'flex-end',
  },
  label: {
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(28),
    color: Colors.black,
    alignSelf: 'center',
  },
});

export default NewGameButton;
