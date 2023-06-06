import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import Header from '../components/common/Header';
import {AuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';

const RankScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const menuRef = React.useRef();
  const {user} = React.useContext(AuthContext);

  const logout = async () => {
    !user?.isGuest && (await signOut(setToken, setUser));
    navigation.pop();
  };

  React.useEffect(() => {
    !isFocused && menuRef?.current?.closeMenu();
  }, [isFocused]);

  return (
    <View
      onStartShouldSetResponder={() => menuRef.current?.closeMenu()}
      style={styles.container}>
      <View
        style={{
          marginTop: insets.top > 0 ? insets.top : DimensionsUtils.getDP(24),
        }}>
        <Header
          ref={menuRef}
          insets={insets}
          isGuest={user?.isGuest}
          label={dict.rankScrTitle}
          avatar={user?.avatar}
          logout={logout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default RankScreen;
