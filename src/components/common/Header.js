/* eslint-disable react-hooks/exhaustive-deps */
import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedButton = Animated.createAnimatedComponent(Pressable);

const Header = React.forwardRef(
  ({noIcon = false, label, avatar, isGuest, logout}, ref) => {
    const fadeRef = useSharedValue(0);
    const height = useSharedValue(32);
    const padding = useSharedValue(4);
    const dimension = useSharedValue(18);
    const borderWidth = useSharedValue(2);

    const [isOpen, setIsOpen] = React.useState(false);
    const [pressed, setPressed] = React.useState(false);
    const [imgLoaded, setImgLoaded] = React.useState(isGuest ? true : false);

    const iconSource = isGuest ? images.guest : {uri: avatar};

    const boxStyle = useAnimatedStyle(
      () => ({
        opacity: fadeRef.value,
        height: height.value,
        padding: padding.value,
        borderWidth: borderWidth.value,
      }),
      [],
    );

    const imgStyle = useAnimatedStyle(
      () => ({
        width: dimension.value,
        height: dimension.value,
      }),
      [],
    );

    const closeMenu = React.useCallback(() => {
      fadeRef.value = withTiming(0, {duration: 200}, () => {
        height.value = 0;
        padding.value = 0;
        dimension.value = 0;
        borderWidth.value = 0;
        runOnJS(setIsOpen)(false);
        runOnJS(setPressed)(false);
      });
    }, []);

    const onAvatarLoad = React.useCallback(() => {
      setImgLoaded(true);
    }, []);

    const onAvatarPress = React.useCallback(() => {
      !pressed && setPressed(true);
    }, [pressed]);

    React.useEffect(() => {
      if (isOpen) {
        height.value = 32;
        padding.value = 4;
        dimension.value = 18;
        borderWidth.value = 2;
        fadeRef.value = withTiming(1, {duration: 250});
      } else {
        closeMenu();
      }
    }, [isOpen]);

    React.useEffect(() => {
      pressed && setIsOpen(true);
    }, [pressed]);

    React.useImperativeHandle(ref, () => ({
      closeMenu,
    }));

    return (
      <>
        <View style={styles.container}>
          <Text
            style={[
              styles.label,
              isAndroid && {
                marginTop: DimensionsUtils.getDP(2),
              },
            ]}>
            {label}
          </Text>
          {!noIcon && (
            <AnimatedButton
              disabled={pressed}
              onPress={onAvatarPress}
              style={[styles.avatarContainer, {opacity: imgLoaded ? 1 : 0}]}>
              <Image
                source={iconSource}
                style={styles.avatar}
                onLoadEnd={onAvatarLoad}
              />
            </AnimatedButton>
          )}
        </View>

        {/* MENU BOX */}
        {!noIcon && (
          <AnimatedButton onPress={logout} style={[styles.box, boxStyle]}>
            <View style={styles.itemRow}>
              <AnimatedImage
                source={images.logout}
                style={[styles.logoutIcon, imgStyle]}
              />
              <Text style={styles.logoutLabel}>{dict?.logout}</Text>
            </View>
          </AnimatedButton>
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
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
    borderColor: Colors.white,
    borderWidth: DimensionsUtils.getDP(2),
    borderRadius: DimensionsUtils.getDP(24),
  },
  avatar: {
    borderColor: Colors.background,
    borderWidth: DimensionsUtils.getDP(2),
    borderRadius: DimensionsUtils.getDP(24),
    width: DimensionsUtils.getDP(36),
    height: DimensionsUtils.getDP(36),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: DimensionsUtils.getDP(-8),
    right: DimensionsUtils.getDP(56),
    backgroundColor: Colors.background,
    marginTop: DimensionsUtils.getDP(16),
    marginRight: DimensionsUtils.getDP(12),
    borderColor: Colors.white,
    borderRadius: DimensionsUtils.getDP(6),
  },
  logoutIcon: {
    marginRight: DimensionsUtils.getDP(4),
  },
  logoutLabel: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(14),
  },
});

export default Header;
