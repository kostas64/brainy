import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  HOST,
  SCORE,
  BEARER,
  BEST_OF,
  EQUAL_MATH,
  GESTURE_IT,
  COLOR_CARDS,
  MATCH_CARDS,
  BEST_OF_USER,
  BALL_BALANCE,
} from '../Endpoints';

export const getBestOf = async setStatus => {
  console.log('API getBestOf ', `${HOST}${SCORE}${BEST_OF}`);

  try {
    setStatus('fetching');
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${SCORE}${BEST_OF}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
    }).then(res => res.json());
  } catch (e) {
    console.log('API getBestOf failed ', e);
  }
};

export const submitScore = async (game, payload) => {
  const GAME =
    game === 'match_cards'
      ? MATCH_CARDS
      : game === 'color_cards'
      ? COLOR_CARDS
      : game === 'equal_math'
      ? EQUAL_MATH
      : game === 'gesture_it'
      ? GESTURE_IT
      : game === 'ball_balance'
      ? BALL_BALANCE
      : null;

  console.log('API submitScore ', `${HOST}${SCORE}${GAME}`, payload);

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${SCORE}${GAME}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.log('API submitScore failed ', e);
  }
};

export const getBestOfScoresForUser = async _id => {
  console.log(
    'API getBestOfScoresForUser ',
    `${HOST}${SCORE}${BEST_OF_USER}`,
    _id,
  );

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${SCORE}${BEST_OF_USER}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({_id}),
    }).then(res => res.json());
  } catch (e) {
    console.log('API getBestOfScoresForUser failed ', e);
  }
};
