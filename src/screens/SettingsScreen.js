import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from '../utils/Colors';
import {signOut} from '../services/auth';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import Privacy from '../components/settings/Privacy';
import MenuItem from '../components/common/MenuItem';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {LOGOUT, FIRST_SECTION, INSPIRE} from '../assets/values/profile';

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
        {FIRST_SECTION.map((item, key) => (
          <MenuItem
            withChevron
            icon={item.icon}
            label={item.title}
            isFirst={key === 0}
            key={`profile-${key}`}
            iconStyle={styles.icon}
            onPress={() => onPressItem(item.screen)}
            isLast={key === FIRST_SECTION.length - 1}
          />
        ))}
      </View>

      <View style={styles.spaceHor}>
        <MenuItem
          isAlone
          withChevron
          icon={INSPIRE.icon}
          label={INSPIRE.title}
          iconStyle={styles.icon}
          key={'settings-inspire'}
          onPress={() => onPressItem(INSPIRE.screen)}
        />
      </View>

      <View style={styles.spaceHor}>
        <MenuItem
          isAlone
          onPress={logout}
          icon={LOGOUT.icon}
          label={LOGOUT.title}
          key={'settings-logout'}
          iconStyle={styles.smallIcon}
          labelStyle={styles.logoutRed}
        />
      </View>

      {/*  App Version */}
      <View style={styles.spaceHorOnly}>
        <Privacy />
      </View>
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
  spaceHorOnly: {
    marginTop: DimensionsUtils.getDP(24),
    marginHorizontal: DimensionsUtils.getDP(24),
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
});
