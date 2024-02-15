import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from './Header';
import {Colors} from '../../utils/Colors';
import {signOut} from '../../services/auth';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Screen = ({
  label,
  noIcon,
  customIcon,
  iconStyle,
  navigation,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const {user, setUser, setToken} = useAuthContext();

  //** ----- STYLES -----
  const contStyles = [
    styles.container,
    {paddingTop: insets.top > 0 ? insets.top : DimensionsUtils.getDP(24)},
  ];

  //** ----- FUNCTIONS -----
  const logout = React.useCallback(async () => {
    !user?.isGuest && (await signOut(setToken, setUser));
    navigation.pop();
  }, [user?.isGuest, navigation, setToken, setUser]);

  return (
    <View style={contStyles}>
      <Header
        label={label}
        noIcon={noIcon}
        insets={insets}
        logout={logout}
        iconStyle={iconStyle}
        avatar={user?.avatar}
        isGuest={user?.isGuest}
        customIcon={customIcon}
      />
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
