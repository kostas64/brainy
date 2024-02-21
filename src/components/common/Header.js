/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Header = ({
  noIcon = false,
  customIcon,
  iconStyle,
  label,
  avatar,
  isGuest,
}) => {
  const navigation = useNavigation();

  const [imgLoaded, setImgLoaded] = React.useState(isGuest ? true : false);

  const iconSource = isGuest
    ? images.guest
    : customIcon
    ? customIcon
    : {uri: avatar};

  //** ----- STYLES -----
  const buttonStyles = [
    styles.avatarContainer,
    isGuest && styles.whiteBorder,
    imgLoaded ? styles.fullOpacity : styles.zeroOpacity,
  ];

  //** ----- FUNCTIONS -----
  const onAvatarLoad = React.useCallback(() => {
    setImgLoaded(true);
  }, []);

  const onAvatarPress = React.useCallback(() => {
    navigation.navigate('Profile');
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {!noIcon && (
          <Pressable onPress={onAvatarPress} style={buttonStyles}>
            <Image
              source={iconSource}
              onLoadEnd={onAvatarLoad}
              style={[styles.avatar, iconStyle]}
            />
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: DimensionsUtils.getDP(40),
    paddingHorizontal: DimensionsUtils.getDP(16),
  },
  label: {
    color: Colors.appGreen,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Bold',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.appGreen,
    borderWidth: DimensionsUtils.getDP(2),
    borderRadius: DimensionsUtils.getDP(24),
    width: DimensionsUtils.getDP(40),
    height: DimensionsUtils.getDP(40),
  },
  avatar: {
    borderColor: Colors.background,
    borderWidth: DimensionsUtils.getDP(2),
    borderRadius: DimensionsUtils.getDP(24),
    width: DimensionsUtils.getDP(36),
    height: DimensionsUtils.getDP(36),
  },
  zeroOpacity: {
    opacity: 0,
  },
  fullOpacity: {
    opacity: 1,
  },
  whiteBorder: {
    borderColor: Colors.white,
  },
});

export default Header;
