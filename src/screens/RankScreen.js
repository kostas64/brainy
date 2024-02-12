import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {useIsFocused} from '@react-navigation/native';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

import {SCORE} from '../Endpoints';
import {Colors} from '../utils/Colors';
import {useFetch} from '../hooks/useFetch';
import {GAMES} from '../assets/values/games';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import {GenericUtils} from '../utils/GenericUtils';
import EmptyList from '../components/common/EmptyList';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {useAuthContext} from '../context/AuthProvider';
import RankGameItem from '../components/rank/RankGameItem';
import InputDropdown from '../components/common/InputDropdown';

const RankScreen = ({navigation}) => {
  const {user} = useAuthContext();
  const isFocused = useIsFocused();

  const menuRef = React.useRef();
  const [query, setQuery] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [force, setForce] = React.useState(false);
  const [gameInput, setGameInput] = React.useState(GAMES[0]);

  const {status, data} = useFetch(query, 'GET', true, gameInput, force, user);

  //** ----- FUNCTIONS -----
  const closeMenu = React.useCallback(() => {
    menuRef.current?.closeMenu();
  }, []);

  const setValue = React.useCallback(
    item => {
      closeMenu();
      setGameInput(item);
    },
    [closeMenu],
  );

  const renderItem = React.useCallback(
    ({item, index}) => (
      <RankGameItem
        item={item}
        index={index}
        gameInput={gameInput}
        key={`rank-game-${index}`}
      />
    ),
    [gameInput],
  );

  //** ----- EFFECTS -----
  React.useEffect(() => {
    !isFocused && menuRef?.current?.closeMenu();
    isFocused && setForce(true);
    !isFocused && setForce(false);
    isFocused && navigation.getParent()?.setOptions({gestureEnabled: false});
  }, [isFocused, navigation]);

  React.useEffect(() => {
    setQuery(`${SCORE}${GenericUtils.getEndpoint(gameInput)}?page=${page}`);
  }, [page, gameInput]);

  return (
    <Screen label={dict.rankScrTitle} navigation={navigation}>
      {user?.isGuest ? (
        <View style={styles.guestMessageContainer}>
          <Text style={styles.guestMessage}>{dict.guestRankMessage}</Text>
        </View>
      ) : (
        !user?.isGuest && (
          <>
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
          </>
        )
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  guestMessageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestMessage: {
    width: 280,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(18),
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
