/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {View, Pressable, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Header = ({
  label,
  avatar,
  hasDot,
  isGuest,
  iconStyle,
  customIcon,
  labelStyle,
  onIconPress,
  onScndIcnPress,
  noIcon = false,
  secondIcon = false,
}) => {
  const navigation = useNavigation();

  const [imgLoaded, setImgLoaded] = React.useState(isGuest ? true : false);

  const iconSource = isGuest
    ? images.guest
    : customIcon
    ? customIcon
    : {uri: avatar};

  //** ----- STYLES -----
  const avatarStyles = isGuest ? styles.avatar : [styles.avatar, iconStyle];

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
    if (onIconPress && !isGuest) {
      onIconPress();
    } else {
      navigation.navigate('Profile');
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
        <View style={styles.row}>
          {secondIcon && !isGuest && (
            <>
              <Pressable
                onPress={onScndIcnPress}
                style={[buttonStyles, {marginRight: DimensionsUtils.getDP(8)}]}>
                <Animated.Image
                  source={images.friendsF}
                  onLoadEnd={onAvatarLoad}
                  style={avatarStyles}
                />
              </Pressable>
              {hasDot && (
                <View style={styles.dotContainer}>
                  <View style={styles.dot} />
                </View>
              )}
            </>
          )}
          {!noIcon && (
            <>
              <Pressable onPress={onAvatarPress} style={buttonStyles}>
                <Animated.Image
                  source={iconSource}
                  onLoadEnd={onAvatarLoad}
                  style={avatarStyles}
                />
              </Pressable>
              {hasDot && (
                <View style={styles.dotContainer}>
                  <View style={styles.dot} />
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DimensionsUtils.getDP(16),
  },
  label: {
    color: Colors.appGreen,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Bold',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.appGreen,
    borderWidth: DimensionsUtils.getDP(2),
    borderRadius: DimensionsUtils.getDP(24),
  },
  avatar: {
    width: 36,
    height: 36,
    borderColor: Colors.background,
    borderWidth: DimensionsUtils.getDP(2),
    borderRadius: DimensionsUtils.getDP(24),
  },
  dotContainer: {
    position: 'absolute',
    borderColor: Colors.background,
    right: 44,
    bottom: 27,
    borderWidth: DimensionsUtils.getDP(3),
    borderRadius: DimensionsUtils.getDP(18),
  },
  dot: {
    backgroundColor: Colors.fillRed,
    width: DimensionsUtils.getDP(12),
    height: DimensionsUtils.getDP(12),
    borderRadius: DimensionsUtils.getDP(6),
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
