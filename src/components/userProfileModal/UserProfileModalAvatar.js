import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const UserProfileModalAvatar = ({
  user,
  icon,
  name,
  imgStyle,
  nameStyle,
  contStyle,
  imgContStyle,
}) => {
  const source = icon ? icon : {uri: user?.avatar};

  return (
    <>
      <View style={[styles.avatarContainer, contStyle]}>
        <View style={[styles.avatarInnerContainer, imgContStyle]}>
          <FastImage
            source={source}
            defaultSource={images.guest}
            style={[styles.avatar, imgStyle]}
          />
        </View>
      </View>
      <Text style={[styles.name, nameStyle]}>{name}</Text>
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
