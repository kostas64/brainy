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
  const translateX = React.useRef(new Animated.Value(200)).current;
  const [pressed, setPressed] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const iconSource = isGuest
    ? require('../../assets/images/guest.png')
    : {uri: avatar};

  const closeMenu = () => {
    Animated.timing(translateX, {
      toValue: 200,
      duration: 200,
      friction: 20,
      tension: 1,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false);
      setPressed(false);
    });
  };

  const onAvatarPress = useCallback(() => {
    if (!pressed) {
      setPressed(true);
    }
  }, [pressed]);

  React.useEffect(() => {
    if (isOpen) {
      Animated.spring(translateX, {
        toValue: 1,
        duration: 250,
        friction: 4,
        tension: 24,
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
      <View style={[styles.container]}>
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
          style={[styles.avatarContainer]}>
          <FastImage source={iconSource} style={styles.avatar} />
        </AnimatedButton>
      </View>

      {/* MENU BOX */}
      <AnimatedButton
        style={[styles.box, {transform: [{translateX}]}]}
        onPress={logout}>
        <View style={styles.triangle} />
        <View style={styles.triangle2} />
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
    top: DimensionsUtils.getDP(42),
    right: DimensionsUtils.getDP(0),
    padding: DimensionsUtils.getDP(8),
    backgroundColor: Colors.background,
    marginTop: DimensionsUtils.getDP(16),
    marginRight: DimensionsUtils.getDP(12),
    borderColor: Colors.white,
    borderWidth: DimensionsUtils.getDP(2),
    borderRadius: DimensionsUtils.getDP(6),
  },
  triangle: {
    width: DimensionsUtils.getDP(12),
    height: DimensionsUtils.getDP(12),
    position: 'absolute',
    top: -DimensionsUtils.getDP(12),
    right: DimensionsUtils.getDP(8),
    borderLeftWidth: DimensionsUtils.getDP(11),
    borderLeftColor: 'transparent',
    borderRightWidth: DimensionsUtils.getDP(11),
    borderRightColor: 'transparent',
    borderBottomWidth: DimensionsUtils.getDP(11),
    borderBottomColor: Colors.white,
  },
  triangle2: {
    width: DimensionsUtils.getDP(12),
    height: DimensionsUtils.getDP(12),
    position: 'absolute',
    top: -DimensionsUtils.getDP(11),
    right: DimensionsUtils.getDP(10),
    borderLeftWidth: DimensionsUtils.getDP(9),
    borderLeftColor: 'transparent',
    borderRightWidth: DimensionsUtils.getDP(9),
    borderRightColor: 'transparent',
    borderBottomWidth: DimensionsUtils.getDP(9),
    borderBottomColor: Colors.background,
  },
  logoutIcon: {
    marginRight: DimensionsUtils.getDP(4),
    width: DimensionsUtils.getDP(24),
    height: DimensionsUtils.getDP(24),
  },
  logoutLabel: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(16),
  },
});

export default Header;
