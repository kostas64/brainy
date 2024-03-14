import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';

const FlipCounter = ({flipCounter}) => {
  return (
    <View style={styles.flipContainer}>
      <Text style={styles.flipLabel}>
        {`${dict.memoryCardFlipLabel}: ${flipCounter}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flipContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.background,
    borderColor: Colors.appGreen,
    borderWidth: 1,
  },
  flipLabel: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
  },
});

export default FlipCounter;
