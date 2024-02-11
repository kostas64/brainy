/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Header = ({noIcon = false, label, avatar, isGuest}) => {
  const navigation = useNavigation();

  const [imgLoaded, setImgLoaded] = React.useState(isGuest ? true : false);

  const iconSource = isGuest ? images.guest : {uri: avatar};

  const buttonStyles = [
    styles.avatarContainer,
    imgLoaded ? styles.fullOpacity : styles.zeroOpacity,
  ];

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
              style={styles.avatar}
              onLoadEnd={onAvatarLoad}
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
  zeroOpacity: {
    opacity: 0,
  },
  fullOpacity: {
    opacity: 1,
  },
});

export default Header;
