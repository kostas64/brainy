import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {Colors} from '../utils/Colors';
import {signOut} from '../services/auth';
import dict from '../assets/values/dict.json';
import {getMyProfile} from '../services/user';
import Screen from '../components/common/Screen';
import MenuItem from '../components/common/MenuItem';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {getAllFriendsRequest} from '../services/friends';
import {PROFILE_SECTIONS} from '../assets/values/profile';

const SettingsScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const {user, setToken, setUser} = useAuthContext();

  const [friendRequests, setFriendRequests] = React.useState([]);

  const profileItems = user?.isGuest
    ? PROFILE_SECTIONS?.slice(4, 5)
    : PROFILE_SECTIONS;

  //** ----- FUNCTIONS -----
  const logout = React.useCallback(async () => {
    navigation.pop(2);
    !user?.isGuest && (await signOut(setToken, setUser, true));
  }, [user?.isGuest, navigation, setToken, setUser]);

  const onPressItem = React.useCallback(
    screen => navigation.navigate(screen),
    [navigation],
  );

  //** ----- EFFECTS -----
  React.useEffect(() => {
    isFocused && getAllFriendsRequest().then(data => setFriendRequests(data));
  }, [isFocused, setUser, navigation]);

  return (
    <Screen label={dict.settingsScrTitle} noIcon>
      <View
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
      </View>

      {/*
         Account
         Friends
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

export default SettingsScreen;

const styles = StyleSheet.create({
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
