/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Animated, StatusBar, StyleSheet} from 'react-native';

import {SCORE} from '../Endpoints';
import {Colors} from '../utils/Colors';
import {signOut} from '../services/auth';
import {useFetch} from '../hooks/useFetch';
import dict from '../assets/values/dict.json';
import Header from '../components/common/Header';
import {LIST_GAMES} from '../assets/values/games';
import {useAuthContext} from '../context/AuthProvider';
import GamesList from '../components/common/GamesList';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {GenericUtils, isIOS} from '../utils/GenericUtils';

const GamesScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const {user, setUser, setToken} = useAuthContext();

  const menuRef = React.useRef();
  const opacityRef = React.useRef(new Animated.Value(0.2)).current;
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;

  const [force, setForce] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const setActiveIndex = React.useCallback(activeIndex => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  }, []);

  const {status, data} = useFetch(
    !user?.isGuest ? `${SCORE}${GenericUtils.getEndpoint('Best Of')}` : null,
    'GET',
    true,
    'Best Of',
    force,
  );

  const logout = async () => {
    !user?.isGuest && (await signOut(setToken, setUser));
    navigation.pop();
  };

  React.useEffect(() => {
    Animated.timing(opacityRef, {
      toValue: 1,
      duration: isIOS ? 1000 : 350,
      useNativeDriver: true,
    }).start();

    const bfrRemove = navigation.addListener('beforeRemove', () => {
      route?.params?.backTransition();
    });

    return bfrRemove;
  }, []);

  React.useEffect(() => {
    !isFocused && menuRef?.current?.closeMenu();
    isFocused && setForce(true);
    !isFocused && setForce(false);
  }, [isFocused]);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      friction: 10,
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      style={[styles.container, styles.flex]}
      onStartShouldSetResponder={() => menuRef?.current?.closeMenu()}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.background}
      />
      <View
        style={[
          styles.zIndex,
          {marginTop: insets.top > 0 ? insets.top : DimensionsUtils.getDP(24)},
        ]}>
        <Header
          ref={menuRef}
          insets={insets}
          isGuest={user?.isGuest}
          label={dict?.gamesScrTitle}
          avatar={user?.avatar}
          logout={logout}
        />
      </View>
      <Animated.View style={[styles.flex, {opacity: opacityRef}]}>
        <GamesList
          data={LIST_GAMES}
          index={index}
          bestScores={data}
          setIndex={setIndex}
          scrollXIndex={scrollXIndex}
          setActiveIndex={setActiveIndex}
          scrollXAnimated={scrollXAnimated}
          loadingScores={status === 'fetching'}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.background,
  },
  zIndex: {
    zIndex: 10000,
  },
});

export default GamesScreen;
