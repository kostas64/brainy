/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {SCORE} from '../Endpoints';
import {useFetch} from '../hooks/useFetch';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import {LIST_GAMES} from '../assets/values/games';
import {useAuthContext} from '../context/AuthProvider';
import GamesList from '../components/common/GamesList';
import {GenericUtils, isIOS} from '../utils/GenericUtils';

const GamesScreen = ({navigation, route}) => {
  const {user} = useAuthContext();
  const isFocused = useIsFocused();

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
    user,
  );

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
    isFocused && navigation.getParent()?.setOptions({gestureEnabled: true});
  }, [isFocused, navigation]);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      friction: 10,
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, [scrollXIndex, scrollXAnimated]);

  return (
    <Screen navigation={navigation} label={dict?.gamesScrTitle}>
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  zIndex: {
    zIndex: 10000,
  },
});

export default GamesScreen;
