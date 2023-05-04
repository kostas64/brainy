import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

import {DimensionsUtils} from '../../utils/DimensionUtils';

const NewGameButton = ({gameFinished, setNewGame}) => {
  return (
    <Pressable onPress={setNewGame} style={[styles.container]}>
      <Text style={styles.label}>
        {gameFinished ? 'Play Again' : 'New Game'}
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
    color: 'black',
    alignSelf: 'center',
  },
});

export default NewGameButton;
