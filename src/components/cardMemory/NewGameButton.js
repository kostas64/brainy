import React from 'react';
import {GenericUtils} from '../../utils/GenericUtils';
import {Text, Pressable, StyleSheet} from 'react-native';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const NewGameButton = ({gameFinished, setNewGame}) => {
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      onPress={setNewGame}
      style={[
        styles.container,
        {
          bottom: insets.bottom > 0 ? insets.bottom : 24,
        },
      ]}>
      <Text style={styles.label}>
        {gameFinished ? 'Play Again' : 'New Game'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: DimensionsUtils.getDP(12),
    alignSelf: 'center',
    borderRadius: DimensionsUtils.getDP(12),
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'flex-end',
  },
  label: {
    fontFamily: GenericUtils.fontFamily(),
    fontSize: DimensionsUtils.getFontSize(28),
    color: 'black',
    alignSelf: 'center',
  },
});

export default NewGameButton;
