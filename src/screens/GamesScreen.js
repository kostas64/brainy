import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Animated, Platform, StatusBar, StyleSheet} from 'react-native';

import {SCORE} from '../Endpoints';
import {Colors} from '../utils/Colors';
import {signOut} from '../services/auth';
import {useFetch} from '../hooks/useFetch';
import dict from '../assets/values/dict.json';
import Header from '../components/common/Header';
import {GenericUtils} from '../utils/GenericUtils';
import {AuthContext} from '../context/AuthProvider';
import GamesList from '../components/common/GamesList';
import {DimensionsUtils} from '../utils/DimensionUtils';

const GamesScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const menuRef = React.useRef();
  const opacityRef = React.useRef(new Animated.Value(0.2)).current;
  const {user, setUser, setToken} = React.useContext(AuthContext);

  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [force, setForce] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback(activeIndex => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  const {status, data, error} = useFetch(
    !user?.isGuest ? `${SCORE}${GenericUtils.getEndpoint('Best Of')}` : null,
    'GET',
    true,
    'Best Of',
    force,
  );

  const GAMES = [
    {
      title: dict.memoryCardsGameTitle,
      poster: require('../assets/images/memory_match.png'),
      onPress: () => navigation.navigate('MemoryCard'),
      description: 'Match the pairs',
    },
    {
      title: dict.colorMatchGameTitle,
      poster: require('../assets/images/color_match.png'),
      onPress: () => navigation.navigate('ColorCard'),
      description: 'Mix up colors and text?',
    },
    {
      title: dict.doTheMathGameTitle,
      poster: require('../assets/images/match_equal.png'),
      onPress: () => navigation.navigate('EqualMath'),
      description: 'Test your math skills',
    },
    {
      title: dict.gestureItGameTitle,
      poster: require('../assets/images/gesture_it.png'),
      onPress: () => navigation.navigate('GestureIt'),
      description: 'Snap to the direction',
    },
  ];

  const logout = async () => {
    !user?.isGuest && (await signOut(setToken, setUser));
    navigation.pop();
  };

  React.useEffect(() => {
    Animated.timing(opacityRef, {
      toValue: 1,
      duration: Platform.OS === 'ios' ? 1000 : 350,
      useNativeDriver: true,
    }).start();

    navigation.addListener('beforeRemove', () => {
      route?.params?.backTransition();
    });
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
  });

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => menuRef?.current?.closeMenu()}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.background}
      />
      <View
        style={{
          zIndex: 10000,
          marginTop: insets.top > 0 ? insets.top : DimensionsUtils.getDP(24),
        }}>
        <Header
          ref={menuRef}
          insets={insets}
          isGuest={user?.isGuest}
          label={dict?.gamesScrTitle}
          avatar={user?.avatar}
          logout={logout}
        />
      </View>
      <Animated.View
        style={{
          flex: 1,
          opacity: opacityRef,
        }}>
        <GamesList
          data={GAMES}
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default GamesScreen;
