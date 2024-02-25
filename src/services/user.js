import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  HOST,
  BEARER,
  MY_PROFILE,
  SEARCH_USER,
  UPDATE_PROFILE,
  REQUEST_ACCESS,
} from '../Endpoints';

export const requestAccess = async user => {
  console.log('API requestAccess ', `${HOST}${REQUEST_ACCESS}`);
  try {
    return fetch(`${HOST}${REQUEST_ACCESS}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: user?.idToken,
        name: user?.user?.givenName,
        surname: user?.user?.familyName,
        avatar: user?.user?.photo,
        email: user?.user?.email,
      }),
    });
  } catch (e) {
    console.log('API requestAccess failed', e);
  }
};

export const getMyProfile = async setUser => {
  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${MY_PROFILE}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(old => ({...old, ...data})));
  } catch (e) {
    console.log('API getMyProfile failed', e);
  }
};

export const updateProfile = async (fields, successCb, errorCb, tokenParam) => {
  console.log('API updateProfile ', `${HOST}${UPDATE_PROFILE}`, fields);
  let token;

  try {
    token = await AsyncStorage.getItem('token');

    if (!token && !!tokenParam) {
      token = tokenParam;
    }

    return fetch(`${HOST}${UPDATE_PROFILE}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({
        fields,
      }),
    })
      .then(res => res.json())
      .then(data => !!successCb && successCb(data))
      .catch(() => !!errorCb && errorCb());
  } catch (e) {
    !!errorCb && errorCb();
    console.log('API updateProfile failed', e);
  }
};

export const searchUser = async (input, page = 1) => {
  console.log('API searchUser ', `${HOST}${SEARCH_USER}`, input, page);

  try {
    const token = await AsyncStorage.getItem('token');
    return fetch(`${HOST}${SEARCH_USER}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({
        page,
        input,
      }),
    }).then(res => res.json());
  } catch (e) {
    console.log('API searchUser failed', e);
  }
};
