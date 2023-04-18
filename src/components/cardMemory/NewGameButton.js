import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const NewGameButton = ({setNewGame}) => {
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      onPress={setNewGame}
      style={[
        styles.container,
        {
          bottom: insets.bottom,
        },
      ]}>
      <Text style={styles.label}>New Game</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 12,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 24,
    fontWeight: '900',
    color: 'black',
    alignSelf: 'center',
  },
});

export default NewGameButton;
