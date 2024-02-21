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

  const opacityRef = React.useRef(new Animated.Value(0.2)).current;

  const [force, setForce] = React.useState(false);

  //** ----- FUNCTIONS -----
  const {status, data} = useFetch(
    !user?.isGuest ? `${SCORE}${GenericUtils.getEndpoint('Best Of')}` : null,
    'GET',
    true,
    'Best Of',
    force,
    user,
  );

  //** ----- EFFECTS -----
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
    isFocused && setForce(true);
    !isFocused && setForce(false);
    isFocused && navigation.getParent()?.setOptions({gestureEnabled: true});
  }, [isFocused, navigation]);

  return (
    <Screen navigation={navigation} label={dict?.gamesScrTitle}>
      <Animated.View style={[styles.flex, {opacity: opacityRef}]}>
        <GamesList
          data={LIST_GAMES}
          bestScores={data}
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
