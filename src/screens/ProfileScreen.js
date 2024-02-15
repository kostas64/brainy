import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {Colors} from '../utils/Colors';
import {signOut} from '../services/auth';
import images from '../assets/images/images';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import {capFirstLet} from '../utils/StringUtils';
import MenuItem from '../components/common/MenuItem';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {getAllFriendsRequest} from '../services/friends';
import {PROFILE_SECTIONS} from '../assets/values/profile';
import UserProfileModalAvatar from '../components/userProfileModal/UserProfileModalAvatar';

const ProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const {user, setToken, setUser} = useAuthContext();

  const [friendRequests, setFriendRequests] = React.useState([]);

  const name = user?.isGuest
    ? dict.guest
    : `${capFirstLet(user?.name)} ${capFirstLet(user?.surname)}`;

  const nameStyle = user?.isGuest && styles.whiteColor;
  const contStyle = user?.isGuest ? styles.guestAvatarCont : styles.avatarCont;
  const imgContStyle = styles.imgCont;
  const imgStyle = styles.imgStyle;
  const icon = user?.isGuest ? images.guest : null;

  const profileItems = user?.isGuest
    ? PROFILE_SECTIONS?.slice(5, 6)
    : PROFILE_SECTIONS;

  //** ----- FUNCTIONS -----
  const logout = React.useCallback(async () => {
    !user?.isGuest && (await signOut(setToken, setUser, true));
    navigation.pop();
  }, [user?.isGuest, navigation, setToken, setUser]);

  const onPressItem = React.useCallback(
    screen => navigation.navigate(screen),
    [navigation],
  );

  //** ----- EFFECTS -----
  React.useEffect(() => {
    isFocused && getAllFriendsRequest().then(data => setFriendRequests(data));
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

      <ScrollView
        style={styles.spaceHor}
        scrollEnabled={!user?.isGuest}
        showsVerticalScrollIndicator={false}>
        {profileItems.map((item, key) => {
          const isLast = key === profileItems.length - 1;
          const iconStyle = isLast ? styles.smallIcon : styles.icon;
          const isRequestSection = item.title === dict.profileFriends;

          return (
            <MenuItem
              key={`profile-${key}`}
              isLast={isLast}
              icon={item.icon}
              label={item.title}
              iconStyle={iconStyle}
              withChevron={!isLast}
              labelStyle={isLast && styles.logoutRed}
              counter={isRequestSection ? friendRequests.length : null}
              onPress={isLast ? logout : () => onPressItem(item.screen)}
            />
          );
        })}
      </ScrollView>

      {/*
         Account
         Friends
         Reminder
         Notifications
         Invite friend
         Logout

         -------------
         Leave feedback
         FAQ

         App Version
      */}
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
  icon: {
    tintColor: Colors.appGreen,
    width: DimensionsUtils.getDP(22),
    height: DimensionsUtils.getDP(22),
    marginRight: DimensionsUtils.getDP(8),
  },
  smallIcon: {
    tintColor: Colors.fillRed,
    width: DimensionsUtils.getDP(18),
    height: DimensionsUtils.getDP(18),
    marginLeft: DimensionsUtils.getDP(4),
    marginRight: DimensionsUtils.getDP(8),
  },
  spaceHor: {
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  logoutRed: {
    color: Colors.fillRed,
  },
});
