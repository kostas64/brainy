import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  PROFILE_SECTIONS,
  PROFILE_SECTIONS_2,
  PROFILE_SECTIONS_3,
} from '../assets/values/profile';
import {Colors} from '../utils/Colors';
import {signOut} from '../services/auth';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import MenuItem from '../components/common/MenuItem';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';

const SettingsScreen = ({navigation}) => {
  const {user, setToken, setUser} = useAuthContext();

  //** ----- FUNCTIONS -----
  const logout = React.useCallback(async () => {
    navigation.pop(2);
    !user?.isGuest && (await signOut(setToken, setUser, true));
  }, [user?.isGuest, navigation, setToken, setUser]);

  const onPressItem = React.useCallback(
    screen => navigation.navigate(screen),
    [navigation],
  );

  return (
    <Screen label={dict.settingsScrTitle} noIcon>
      <View
        style={styles.spaceHor}
        scrollEnabled={!user?.isGuest}
        showsVerticalScrollIndicator={false}>
        {PROFILE_SECTIONS.map((item, key) => (
          <MenuItem
            key={`profile-${key}`}
            withChevron
            isFirst={key === 0}
            icon={item.icon}
            label={item.title}
            iconStyle={styles.icon}
            isLast={key === PROFILE_SECTIONS.length - 1}
            onPress={() => onPressItem(item.screen)}
          />
        ))}
      </View>

      <View
        style={styles.spaceHor}
        scrollEnabled={!user?.isGuest}
        showsVerticalScrollIndicator={false}>
        {PROFILE_SECTIONS_2.map((item, key) => (
          <MenuItem
            withChevron
            icon={item.icon}
            label={item.title}
            isFirst={key === 0}
            key={`profile-${key}`}
            iconStyle={styles.icon}
            onPress={() => onPressItem(item.screen)}
            isLast={key === PROFILE_SECTIONS_2.length - 1}
          />
        ))}
      </View>

      <View style={styles.spaceHor}>
        <MenuItem
          isAlone
          onPress={logout}
          key={'profile-last'}
          iconStyle={styles.smallIcon}
          labelStyle={styles.logoutRed}
          icon={PROFILE_SECTIONS_3.icon}
          label={PROFILE_SECTIONS_3.title}
        />
      </View>

      {/*  App Version */}
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
    marginTop: DimensionsUtils.getDP(24),
    borderRadius: DimensionsUtils.getDP(14),
    marginHorizontal: DimensionsUtils.getDP(16),
    backgroundColor: Colors.tabBarBg,
  },
  logoutRed: {
    color: Colors.fillRed,
  },
  spaceTop: {
    marginTop: DimensionsUtils.getDP(24),
  },
});
