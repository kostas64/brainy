import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  HOST,
  BEARER,
  FRIENDSHIP,
  LIST_FRIENDS,
  DELETE_FRIEND,
  FRIENDS_REQUEST,
  CHECK_FRIENDS_REQUEST,
  CANCEL_FRIENDS_REQUEST,
  ACCEPT_FRIENDS_REQUEST,
  CHECK_ALL_FRIENDS_REQUESTS,
} from '../Endpoints';

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
    }).then(res => res.json());
  } catch (e) {
    console.log('API areWeFriends failed', e);
  }
};

export const deleteFriend = async userIdDeleted => {
  console.log('API deleteFriend ', `${HOST}${DELETE_FRIEND}`, userIdDeleted);

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${DELETE_FRIEND}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({
        userIdDeleted,
      }),
    }).then(res => res.json());
  } catch (e) {
    console.log('API deleteFriend failed', e);
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
  console.log(
    'API cancelFriendsRequest ',
    `${HOST}${CANCEL_FRIENDS_REQUEST}`,
    userId_requested,
  );

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

export const acceptFriendsRequest = async userId_request => {
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
        userId_request,
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
    }).then(res => res.json());
  } catch (e) {
    console.log('API getFriendsRequest failed', e);
  }
};

export const getAllFriendsRequest = async () => {
  console.log(
    'API getAllFriendsRequest ',
    `${HOST}${CHECK_ALL_FRIENDS_REQUESTS}`,
  );

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${CHECK_ALL_FRIENDS_REQUESTS}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
    }).then(res => res.json());
  } catch (e) {
    console.log('API getAllFriendsRequest failed', e);
  }
};

export const getAllFriends = async () => {
  console.log('API getAllFriends ', `${HOST}${LIST_FRIENDS}`);

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${LIST_FRIENDS}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
    }).then(res => res.json());
  } catch (e) {
    console.log('API getAllFriends failed', e);
  }
};
