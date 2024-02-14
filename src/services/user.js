import AsyncStorage from '@react-native-async-storage/async-storage';

import {BEARER, HOST, REQUEST_ACCESS, UPDATE_PROFILE} from '../Endpoints';

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

export const updateProfile = async (fields, successCb, errorCb) => {
  console.log('API updateProfile ', `${HOST}${UPDATE_PROFILE}`, fields);

  try {
    const token = await AsyncStorage.getItem('token');
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
      .then(data => successCb(data))
      .catch(() => errorCb());
  } catch (e) {
    !!errorCb && errorCb();
    console.log('API updateProfile failed', e);
  }
};
