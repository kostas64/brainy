import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import {GAMES} from '../assets/values/games';
import dict from '../assets/values/dict.json';
import Header from '../components/common/Header';
import {AuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import InputDropdown from '../components/common/InputDropdown';

const RankScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const menuRef = React.useRef();
  const {user} = React.useContext(AuthContext);

  const [gameInput, setGameInput] = React.useState(GAMES[0]);

  const closeMenu = () => menuRef.current?.closeMenu();

  const setValue = item => {
    closeMenu();
    setGameInput(item);
  };

  const logout = async () => {
    !user?.isGuest && (await signOut(setToken, setUser));
    navigation.pop();
  };

  React.useEffect(() => {
    !isFocused && menuRef?.current?.closeMenu();
  }, [isFocused]);

  return (
    <View onStartShouldSetResponder={closeMenu} style={styles.container}>
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
      <View
        style={styles.dropdownContainer}
        onStartShouldSetResponder={closeMenu}>
        <InputDropdown
          value={gameInput}
          setValue={setValue}
          isFocused={isFocused}
          onFieldPress={closeMenu}
          placeholder={dict.rankDropdownPlaceholder}
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
  dropdownContainer: {
    paddingHorizontal: DimensionsUtils.getDP(16),
    paddingVertical: DimensionsUtils.getDP(12),
  },
});

export default RankScreen;
