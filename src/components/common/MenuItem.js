import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import Chevron from './Chevron';
import Counter from './Counter';
import Touchable from './Touchable';
import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const NumIndicator = ({number}) => (
  <View style={styles.spaceRight}>
    <Counter counter={number} />
  </View>
);

const MenuItem = ({
  label,
  icon,
  counter,
  onPress,
  iconStyle,
  labelStyle,
  withChevron,
  isLast = false,
  isAlone = false,
}) => {
  const showCounter = counter > 0;

  return (
    <>
      <View>
        <Touchable
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
        </Touchable>
      </View>
      {!(isLast || isAlone) && <View style={styles.hr} />}
    </>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DimensionsUtils.getDP(8),
  },
  spaceBetween: {
    justifyContent: 'space-between',
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
  hr: {
    height: 1,
    alignSelf: 'flex-end',
    width: WIDTH - DimensionsUtils.getDP(48),
    backgroundColor: Colors.lightAppGreen,
  },
});
