import React from 'react';
import {StyleSheet, View} from 'react-native';

import MenuItem from '../common/MenuItem';
import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const InviteButton = () => {
  return (
    <View style={styles.spaceHor}>
      <MenuItem
        isAlone
        withChevron
        icon={images.envelope}
        iconStyle={styles.icon}
        label={dict.profileInvite}
        chevronStyle={styles.chevron}
      />
    </View>
  );
};

export default InviteButton;

const styles = StyleSheet.create({
  spaceHor: {
    marginVertical: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(14),
    marginHorizontal: DimensionsUtils.getDP(16),
    backgroundColor: Colors.tabBarBg,
  },
  icon: {
    tintColor: Colors.appGreen,
    width: DimensionsUtils.getDP(22),
    height: DimensionsUtils.getDP(22),
    marginRight: DimensionsUtils.getDP(8),
  },
  chevron: {
    transform: [{rotate: '0deg'}],
  },
});
