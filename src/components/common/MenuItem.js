import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import Chevron from './Chevron';
import Counter from './Counter';
import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const NumIndicator = ({number}) => (
  <View style={styles.spaceRight}>
    <Counter counter={number} />
  </View>
);

const MenuItem = ({
  label,
  icon,
  isLast,
  counter,
  onPress,
  iconStyle,
  labelStyle,
  withChevron,
}) => {
  const showCounter = counter > 0;

  return (
    <View style={[styles.menuItemCont, isLast && styles.noBorder]}>
      <Pressable
        onPress={onPress}
        style={[styles.rowCenter, styles.spaceBetween]}>
        <View style={styles.rowCenter}>
          <Image source={icon} style={iconStyle} />
          <Text style={[styles.menuItemLabel, labelStyle]}>{label}</Text>
        </View>
        <View style={styles.rowCenter}>
          {showCounter && <NumIndicator number={counter} />}
          {withChevron && <Chevron />}
        </View>
      </Pressable>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  menuItemCont: {
    borderBottomColor: Colors.lightAppGreen,
    borderBottomWidth: 1,
  },
  menuItemLabel: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Regular',
    marginVertical: DimensionsUtils.getDP(16),
    fontSize: DimensionsUtils.getFontSize(16),
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  spaceRight: {
    marginRight: DimensionsUtils.getDP(16),
  },
});
