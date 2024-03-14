import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';

const Points = ({points}) => {
  return (
    <View style={[styles.counterContainer]}>
      <Text
        style={styles.counterLabel}>{`${dict.pointsLabel}: ${points} `}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.appGreen,
  },
  counterLabel: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
  },
});

export default Points;
