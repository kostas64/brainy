/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import {SCORE} from '../Endpoints';
import {Colors} from '../utils/Colors';
import {signOut} from '../services/auth';
import {useFetch} from '../hooks/useFetch';
import {GAMES} from '../assets/values/games';
import dict from '../assets/values/dict.json';
import Header from '../components/common/Header';
import {GenericUtils} from '../utils/GenericUtils';
import {useAuthContext} from '../context/AuthProvider';
import EmptyList from '../components/common/EmptyList';
import {DimensionsUtils} from '../utils/DimensionUtils';
import InputDropdown from '../components/common/InputDropdown';
import RankFlipListItem from '../components/rank/RankFlipListItem';
import RankPointListItem from '../components/rank/RankPointListItem';

const RankScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const menuRef = React.useRef();
  const {user, setUser, setToken} = useAuthContext();

  const [query, setQuery] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [force, setForce] = React.useState(false);
  const [gameInput, setGameInput] = React.useState(GAMES[0]);

  const {status, data} = useFetch(query, 'GET', true, gameInput, force);

  const closeMenu = () => menuRef.current?.closeMenu();

  const setValue = item => {
    closeMenu();
    setGameInput(item);
  };

  const logout = React.useCallback(async () => {
    !user?.isGuest && (await signOut(setToken, setUser));
    navigation.pop();
  }, [user?.isGuest]);

  const renderItem = ({item, index}) => {
    switch (gameInput) {
      case GAMES[0]:
        return (
          <RankFlipListItem
            item={item}
            index={index}
            isMe={!user?.isGuest && user?.email === item?.user?.[0]?.email}
          />
        );
      case GAMES[1]:
      case GAMES[2]:
      case GAMES[3]:
        return (
          <RankPointListItem
            item={item}
            index={index}
            isMe={!user?.isGuest && user?.email === item?.user?.[0]?.email}
          />
        );
      default:
        return null;
    }
  };

  React.useEffect(() => {
    !isFocused && menuRef?.current?.closeMenu();
    isFocused && setForce(true);
    !isFocused && setForce(false);
  }, [isFocused]);

  React.useEffect(() => {
    setQuery(`${SCORE}${GenericUtils.getEndpoint(gameInput)}?page=${page}`);
  }, [gameInput]);

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
      {status === 'fetching' ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size={'small'} color={Colors.tabBarIcon} />
        </View>
      ) : status === 'fetched' && data.scores?.length > 0 ? (
        <FlashList
          data={data.scores}
          keyExtractor={(_, index) => `index_${index}`}
          renderItem={renderItem}
          estimatedItemSize={DimensionsUtils.getDP(56)}
        />
      ) : status === 'fetched' ? (
        <EmptyList />
      ) : null}
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: -DimensionsUtils.getDP(16),
  },
});

export default RankScreen;
