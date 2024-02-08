import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const UserProfileModalAvatar = ({user, name}) => {
  return (
    <>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarInnerContainer}>
          <FastImage source={{uri: user?.avatar}} style={styles.avatar} />
        </View>
      </View>
      <Text style={styles.name}>{name}</Text>
    </>
  );
};

export default UserProfileModalAvatar;

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 3,
    borderRadius: 40,
    alignSelf: 'center',
    borderColor: Colors.appGreen,
  },
  avatarInnerContainer: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: Colors.tabBarBg,
  },
  avatar: {
    width: DimensionsUtils.getDP(64),
    height: DimensionsUtils.getDP(64),
    borderRadius: DimensionsUtils.getDP(32),
  },
  name: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: DimensionsUtils.getFontSize(18),
    color: Colors.appGreen,
    marginTop: DimensionsUtils.getDP(8),
    marginBottom: DimensionsUtils.getDP(16),
  },
});
