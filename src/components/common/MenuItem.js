import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const MenuItem = ({label, icon, isLast, iconStyle, labelStyle, onPress}) => {
  return (
    <View style={[styles.menuItemCont, isLast && styles.noBorder]}>
      <TouchableOpacity style={styles.rowCenter} onPress={onPress}>
        <Image source={icon} style={iconStyle} />
        <Text style={[styles.menuItemLabel, labelStyle]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
