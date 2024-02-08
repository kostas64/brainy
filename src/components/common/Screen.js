import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from './Header';
import {Colors} from '../../utils/Colors';
import {signOut} from '../../services/auth';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Screen = ({label, noIcon, navigation, children}) => {
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

  return (
    <View onStartShouldSetResponder={closeMenu} style={styles.container}>
      <View
        style={{
          marginTop: insets.top > 0 ? insets.top : DimensionsUtils.getDP(24),
        }}>
        <Header
          ref={menuRef}
          label={label}
          noIcon={noIcon}
          insets={insets}
          logout={logout}
          avatar={user?.avatar}
          isGuest={user?.isGuest}
        />
      </View>
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
