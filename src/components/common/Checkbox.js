import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';

const Checkbox = ({selected}) => {
  return !selected ? (
    <View style={[styles.outerCircle, selected && styles.orangeBg]}>
      <View style={[styles.innerCircle, selected && styles.orangeBg]} />
    </View>
  ) : (
    <View style={[styles.outerCircle, selected && styles.orangeBg]}>
      <View style={styles.inCircleDark} />
    </View>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.appGreen,
    justifyContent: 'center',
  },
  innerCircle: {
    alignSelf: 'center',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.tabBarBg,
  },
  orangeBg: {
    backgroundColor: Colors.appGreen,
  },
  outCircleDark: {
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  inCircleDark: {
    backgroundColor: Colors.appGreen,
    borderColor: Colors.tabBarBg,
    borderWidth: 3,
    left: 4,
    borderRadius: 8,
    width: 16,
    height: 16,
  },
});

export default Checkbox;
