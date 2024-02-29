import React from 'react';
import {StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {Colors} from '../utils/Colors';
import images from '../assets/images/images';
import dict from '../assets/values/dict.json';
import {getMyProfile} from '../services/user';
import Screen from '../components/common/Screen';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {getAllFriendsRequest} from '../services/friends';
import ProfileScoresSection from '../components/profile/ProfileScoresSection';
import UserProfileModalAvatar from '../components/userProfileModal/UserProfileModalAvatar';

const ProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const {user, setUser} = useAuthContext();

  const [friendRequests, setFriendRequests] = React.useState([]);

  const name = user?.isGuest
    ? dict.guest
    : user?.nickname
    ? user?.nickname
    : `${user?.name} ${user?.surname}`;

  const nameStyle = user?.isGuest && styles.whiteColor;
  const contStyle = user?.isGuest ? styles.guestAvatarCont : styles.avatarCont;
  const imgContStyle = styles.imgCont;
  const imgStyle = styles.imgStyle;
  const icon = user?.isGuest ? images.guest : null;

  //** ----- FUNCTIONS -----
  const onIconPress = React.useCallback(
    screen => navigation.navigate(screen),
    [navigation],
  );

  //** ----- EFFECTS -----
  React.useEffect(() => {
    isFocused && getMyProfile(setUser);
    isFocused && getAllFriendsRequest().then(data => setFriendRequests(data));
  }, [isFocused, setUser, navigation]);

  return (
    <Screen
      secondIcon
      noIcon={user?.isGuest}
      customIcon={images.gear}
      iconStyle={styles.gearIcon}
      label={dict.profileScrTitle}
      onIconPress={() => onIconPress('Settings')}
      onScndIcnPress={() => onIconPress('FriendsTabs')}
      hasDot={friendRequests?.length > 0}>
      <UserProfileModalAvatar
        user={user}
        name={name}
        icon={icon}
        imgStyle={imgStyle}
        nameStyle={nameStyle}
        contStyle={contStyle}
        imgContStyle={imgContStyle}
      />

      <ProfileScoresSection />
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  avatarCont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(112),
    height: DimensionsUtils.getDP(112),
    borderRadius: DimensionsUtils.getDP(56),
  },
  guestAvatarCont: {
    marginTop: DimensionsUtils.getDP(8),
    borderColor: Colors.white,
    width: DimensionsUtils.getDP(112),
    height: DimensionsUtils.getDP(112),
    borderRadius: DimensionsUtils.getDP(56),
  },
  gearIcon: {
    tintColor: Colors.appGreen,
    width: 21,
    height: 21,
    borderWidth: 0,
    borderRadius: 0,
  },
  imgCont: {
    width: DimensionsUtils.getDP(106),
    height: DimensionsUtils.getDP(106),
    borderRadius: DimensionsUtils.getDP(53),
  },
  imgStyle: {
    width: DimensionsUtils.getDP(102),
    height: DimensionsUtils.getDP(102),
    borderRadius: DimensionsUtils.getDP(51),
  },
  whiteColor: {
    color: Colors.white,
    marginBottom: DimensionsUtils.getDP(8),
  },
});
