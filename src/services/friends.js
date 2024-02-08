import {
  HOST,
  BEARER,
  FRIENDSHIP,
  FRIENDS_REQUEST,
  CANCEL_FRIENDS_REQUEST,
  ACCEPT_FRIENDS_REQUEST,
  CHECK_FRIENDS_REQUEST,
} from '../Endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const areWeFriends = async userId_requested => {
  console.log('API areWeFriends ', `${HOST}${FRIENDSHIP}`, userId_requested);

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${FRIENDSHIP}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({
        userId_requested,
      }),
    });
  } catch (e) {
    console.log('API areWeFriends failed', e);
  }
};

export const sendFriendsRequest = async userId_requested => {
  console.log(
    'API sendFriendsRequest ',
    `${HOST}${FRIENDS_REQUEST}`,
    userId_requested,
  );

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${FRIENDS_REQUEST}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({
        userId_requested,
      }),
    });
  } catch (e) {
    console.log('API sendFriendsRequest failed', e);
  }
};

export const cancelFriendsRequest = async userId_requested => {
  console.log('API cancelFriendsRequest ', `${HOST}${CANCEL_FRIENDS_REQUEST}`);

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${CANCEL_FRIENDS_REQUEST}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({
        userId_requested,
      }),
    });
  } catch (e) {
    console.log('API cancelFriendsRequest failed', e);
  }
};

export const acceptFriendsRequest = async userId_requested => {
  console.log('API acceptFriendsRequest ', `${HOST}${ACCEPT_FRIENDS_REQUEST}`);

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${ACCEPT_FRIENDS_REQUEST}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({
        userId_requested: '658063b79c12c6a21206895f',
      }),
    });
  } catch (e) {
    console.log('API acceptFriendsRequest failed', e);
  }
};

export const getFriendsRequest = async userId_requested => {
  console.log('API getFriendsRequest ', `${HOST}${CHECK_FRIENDS_REQUEST}`);

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${CHECK_FRIENDS_REQUEST}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({
        userId_requested,
      }),
    });
  } catch (e) {
    console.log('API getFriendsRequest failed', e);
  }
};
