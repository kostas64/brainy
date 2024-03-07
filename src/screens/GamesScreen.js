/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {isIOS} from '../utils/GenericUtils';
import {getBestOf} from '../services/score';
import dict from '../assets/values/dict.json';
import {useStorage} from '../hooks/useStorage';
import Screen from '../components/common/Screen';
import {LIST_GAMES} from '../assets/values/games';
import {useAuthContext} from '../context/AuthProvider';
import GamesList from '../components/common/GamesList';
import {updateNotificationToken} from '../services/user';

const GamesScreen = ({navigation, route}) => {
  const {user} = useAuthContext();
  const isFocused = useIsFocused();
  const [scores, setScores] = useStorage('scores', []);

  const [status, setStatus] = React.useState('idle');
  const opacityRef = React.useRef(new Animated.Value(0.2)).current;

  //** ----- FUNCTIONS -----
  const getBestOfScores = () => {
    getBestOf(setStatus)
      .then(data => setScores(data))
      .finally(() => setStatus('idle'));
  };

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
    isFocused && !user?.isGuest && updateNotificationToken();
  }, [isFocused, navigation]);

  React.useEffect(() => {
    !user?.isGuest && getBestOfScores();
  }, []);

  return (
    <Screen label={dict?.gamesScrTitle}>
      <Animated.View style={[styles.flex, {opacity: opacityRef}]}>
        <GamesList
          data={LIST_GAMES}
          bestScores={scores}
          getBestOfScores={getBestOfScores}
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
