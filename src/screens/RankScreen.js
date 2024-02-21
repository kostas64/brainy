/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {useIsFocused} from '@react-navigation/native';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

import {Colors} from '../utils/Colors';
import {HOST, SCORE} from '../Endpoints';
import {GAMES} from '../assets/values/games';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import {GenericUtils} from '../utils/GenericUtils';
import EmptyList from '../components/common/EmptyList';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import RankGameItem from '../components/rank/RankGameItem';
import InputDropdown from '../components/common/InputDropdown';

const initialState = {
  data: [],
  page: 1,
  noData: false,
};

const RankScreen = ({navigation}) => {
  const {user} = useAuthContext();
  const isFocused = useIsFocused();

  const menuRef = React.useRef();
  const firstRender = React.useRef(0);

  const [state, setState] = React.useState(initialState);
  const [loadingApi, setLoadingApi] = React.useState(false);
  const [gameInput, setGameInput] = React.useState(GAMES[0]);

  const URL = `${HOST}${SCORE}${GenericUtils.getEndpoint(gameInput)}?page=${
    state.page
  }`;

  //** ----- FUNCTIONS -----
  const closeMenu = React.useCallback(() => {
    menuRef.current?.closeMenu();
  }, []);

  const setValue = React.useCallback(
    item => {
      closeMenu();
      resetState();
      setGameInput(item);
    },
    [closeMenu, resetState],
  );

  const renderItem = React.useCallback(
    ({item, index}) => (
      <RankGameItem
        item={item}
        index={index}
        gameInput={gameInput}
        key={`rank-game-${index}`}
        isLast={index === state.data?.length - 1}
      />
    ),
    [gameInput, state.data],
  );

  const onEndReached = React.useCallback(() => {
    if (!state.noData && !loadingApi) {
      fetchData();
    }
  }, [state, loadingApi, fetchData]);

  const fetchGameData = async () => {
    const tmp = await fetch(URL).then(res => res.json());

    return tmp;
  };

  const resetState = React.useCallback(() => {
    setState(initialState);
  }, []);

  const ListFooter = React.useCallback(() => {
    if (loadingApi) {
      return <ActivityIndicator size={'small'} color={Colors.appGreen} />;
    }
  }, [loadingApi]);

  const ListEmpty = React.useCallback(() => {
    if (!loadingApi && state.data.length === 0) {
      return <EmptyList />;
    }
  }, [loadingApi, state.data]);

  const fetchData = async () => {
    try {
      setLoadingApi(true);
      firstRender.current += 1;
      const newData = await fetchGameData(state.page, gameInput);

      setState(prevData => {
        if (!prevData.noData) {
          return {
            data: [...prevData.data, ...newData.scores],
            page: state.page + 1,
            noData: newData.scores.length < 10,
          };
        } else {
          return prevData;
        }
      });

      setLoadingApi(false);
    } catch (error) {
      setLoadingApi(false);
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    // Reset data and page when gameInput changes
    if (firstRender.current !== 0) {
      resetState();
      fetchData();
    }
  }, [gameInput]);

  React.useEffect(() => {
    fetchData();
  }, []);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    !isFocused && menuRef?.current?.closeMenu();
    isFocused && navigation.getParent()?.setOptions({gestureEnabled: false});
  }, [isFocused, navigation]);

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

            <View style={styles.spaceBottom}>
              <FlashList
                data={state.data}
                renderItem={renderItem}
                extraData={state.data}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.25}
                ListEmptyComponent={ListEmpty}
                ListFooterComponent={ListFooter}
                keyExtractor={(_, index) => `index_${index}`}
                estimatedItemSize={DimensionsUtils.getDP(56)}
              />
            </View>
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
    paddingTop: DimensionsUtils.getDP(12),
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: -DimensionsUtils.getDP(16),
  },
  spaceBottom: {
    flex: 1,
    marginBottom: DimensionsUtils.getDP(8),
  },
});

export default RankScreen;
