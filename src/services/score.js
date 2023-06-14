import {
  HOST,
  SCORE,
  BEARER,
  EQUAL_MATH,
  GESTURE_IT,
  COLOR_CARDS,
  MATCH_CARDS,
} from '../Endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      : null;

  console.log('API submitScore ', `${HOST}${SCORE}${GAME}`, payload);

  try {
    const token = await AsyncStorage.getItem('token');

    fetch(`${HOST}${SCORE}${GAME}`, {
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
