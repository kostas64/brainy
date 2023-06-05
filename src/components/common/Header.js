import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, Text, StyleSheet, Platform} from 'react-native';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Header = ({label, avatar, isGuest}) => {
  const iconSource = isGuest
    ? require('../../assets/images/guest.png')
    : {uri: avatar};

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          Platform.OS === 'android' && {
            marginTop: DimensionsUtils.getDP(2),
          },
        ]}>
        {label}
      </Text>
      {avatar && (
        <View style={styles.avatarContainer}>
          <FastImage source={iconSource} style={styles.avatar} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: DimensionsUtils.getDP(16),
    paddingHorizontal: DimensionsUtils.getDP(12),
  },
  label: {
    color: Colors.appGreen,
    marginLeft: DimensionsUtils.getDP(12),
    fontSize: DimensionsUtils.getFontSize(28),
    fontFamily: 'Poppins-Bold',
  },
  avatarContainer: {
    borderColor: Colors.appGreen,
    borderWidth: DimensionsUtils.getDP(3),
    borderRadius: DimensionsUtils.getDP(24),
  },
  avatar: {
    borderWidth: DimensionsUtils.getDP(2),
    borderRadius: DimensionsUtils.getDP(24),
    width: DimensionsUtils.getDP(40),
    height: DimensionsUtils.getDP(40),
  },
});

export default Header;
