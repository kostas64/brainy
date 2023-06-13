import {
  View,
  Text,
  Platform,
  Animated,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useCallback} from 'react';
import FastImage from 'react-native-fast-image';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimatedButton = Animated.createAnimatedComponent(Pressable);

const Header = React.forwardRef(({label, avatar, isGuest, logout}, ref) => {
  const fadeRef = React.useRef(new Animated.Value(0)).current;

  const [isOpen, setIsOpen] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [imgLoaded, setImgLoaded] = React.useState(isGuest ? true : false);

  const iconSource = isGuest
    ? require('../../assets/images/guest.png')
    : {uri: avatar};

  const closeMenu = () => {
    Animated.timing(fadeRef, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false);
      setPressed(false);
    });
  };

  const onAvatarLoad = useCallback(() => {
    setImgLoaded(true);
  });

  const onAvatarPress = useCallback(() => {
    if (!pressed) {
      setPressed(true);
    }
  }, [pressed]);

  React.useEffect(() => {
    if (isOpen) {
      Animated.timing(fadeRef, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      closeMenu();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (pressed) {
      setIsOpen(true);
    }
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
            Platform.OS === 'android' && {
              marginTop: DimensionsUtils.getDP(2),
            },
          ]}>
          {label}
        </Text>
        <AnimatedButton
          disabled={pressed}
          onPress={onAvatarPress}
          style={[styles.avatarContainer, {opacity: imgLoaded ? 1 : 0}]}>
          <FastImage
            onLoadEnd={onAvatarLoad}
            source={iconSource}
            style={styles.avatar}
          />
        </AnimatedButton>
      </View>

      {/* MENU BOX */}
      <AnimatedButton style={[styles.box, {opacity: fadeRef}]} onPress={logout}>
        <View style={styles.itemRow}>
          <FastImage
            source={require('../../assets/images/logout.png')}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutLabel}>{dict?.logout}</Text>
        </View>
      </AnimatedButton>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DimensionsUtils.getDP(16),
  },
  label: {
    color: Colors.appGreen,
    fontSize: DimensionsUtils.getFontSize(28),
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
    padding: DimensionsUtils.getDP(4),
    backgroundColor: Colors.background,
    marginTop: DimensionsUtils.getDP(16),
    marginRight: DimensionsUtils.getDP(12),
    borderColor: Colors.white,
    borderWidth: DimensionsUtils.getDP(2),
    borderRadius: DimensionsUtils.getDP(6),
  },
  logoutIcon: {
    marginRight: DimensionsUtils.getDP(4),
    width: DimensionsUtils.getDP(18),
    height: DimensionsUtils.getDP(18),
  },
  logoutLabel: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(14),
  },
});

export default Header;
