import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import {signOut} from '../services/auth';
import dict from '../assets/values/dict.json';
import Header from '../components/common/Header';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';

const ProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const {user, setUser, setToken} = useAuthContext();

  const menuRef = React.useRef();

  const logout = React.useCallback(async () => {
    !user?.isGuest && (await signOut(setToken, setUser));
    navigation.pop();
  }, [user?.isGuest, navigation, setToken, setUser]);

  const closeMenu = React.useCallback(() => {
    menuRef.current?.closeMenu();
  }, []);

  React.useEffect(() => {
    isFocused && navigation.getParent()?.setOptions({gestureEnabled: false});
  }, [isFocused, navigation]);

  return (
    <View style={styles.container} onStartShouldSetResponder={closeMenu}>
      <View
        style={{
          marginTop: insets.top > 0 ? insets.top : DimensionsUtils.getDP(24),
        }}>
        <Header
          ref={menuRef}
          insets={insets}
          isGuest={user?.isGuest}
          label={dict.profileScrTitle}
          avatar={user?.avatar}
          logout={logout}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
