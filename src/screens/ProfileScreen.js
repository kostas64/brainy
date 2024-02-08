import React from 'react';
import {StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {Colors} from '../utils/Colors';
import images from '../assets/images/images';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import {capFirstLet} from '../utils/StringUtils';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import UserProfileModalAvatar from '../components/userProfileModal/UserProfileModalAvatar';

const ProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const {user} = useAuthContext();

  const name = user?.isGuest
    ? dict.guest
    : `${capFirstLet(user?.name)} ${capFirstLet(user?.surname)}`;

  const nameStyle = user?.isGuest && styles.whiteColor;
  const contStyle = user?.isGuest ? styles.guestAvatarCont : styles.avatarCont;
  const imgContStyle = styles.imgCont;
  const imgStyle = styles.imgStyle;
  const icon = user?.isGuest ? images.guest : null;

  React.useEffect(() => {
    isFocused && navigation.getParent()?.setOptions({gestureEnabled: false});
  }, [isFocused, navigation]);

  return (
    <Screen label={dict.profileScrTitle} navigation={navigation} noIcon>
      <UserProfileModalAvatar
        user={user}
        name={name}
        icon={icon}
        imgStyle={imgStyle}
        nameStyle={nameStyle}
        contStyle={contStyle}
        imgContStyle={imgContStyle}
      />
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  avatarCont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: DimensionsUtils.getDP(16),
    width: DimensionsUtils.getDP(128),
    height: DimensionsUtils.getDP(128),
    borderRadius: DimensionsUtils.getDP(64),
  },
  guestAvatarCont: {
    marginTop: DimensionsUtils.getDP(16),
    borderColor: Colors.white,
    width: DimensionsUtils.getDP(128),
    height: DimensionsUtils.getDP(128),
    borderRadius: DimensionsUtils.getDP(64),
  },
  imgCont: {
    width: DimensionsUtils.getDP(121),
    height: DimensionsUtils.getDP(121),
    borderRadius: DimensionsUtils.getDP(64),
  },
  imgStyle: {
    width: DimensionsUtils.getDP(116),
    height: DimensionsUtils.getDP(116),
    borderRadius: DimensionsUtils.getDP(64),
  },
  whiteColor: {
    color: Colors.white,
  },
});
