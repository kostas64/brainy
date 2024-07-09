import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  HOST,
  BEARER,
  MY_PROFILE,
  SEARCH_USER,
  NOTIF_TOKEN,
  LOGOUT_USER,
  UPDATE_PROFILE,
  REQUEST_ACCESS,
  NOTIF_SETTINGS,
  DELETE_ACCOUNT,
} from '../Endpoints';
import {storage} from '../..';

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
        email: user?.user?.email,
        deviceOS: Platform.OS,
      }),
    });
  } catch (e) {
    console.log('API requestAccess failed', e);
  }
};

export const logoutUser = async () => {
  console.log('API logoutUser ', `${HOST}${LOGOUT_USER}`);
  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${LOGOUT_USER}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
    });
  } catch (e) {
    console.log('API logoutUser failed', e);
  }
};

export const getMyProfile = async setUser => {
  console.log('API getMyProfile ', `${HOST}${MY_PROFILE}`);

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

export const updateNotifSetts = async settings => {
  console.log('API updateNotifSetts ', `${HOST}${NOTIF_SETTINGS}`, settings);

  try {
    const token = await AsyncStorage.getItem('token');
    return fetch(`${HOST}${NOTIF_SETTINGS}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({
        settings,
      }),
    });
  } catch (e) {
    console.log('API updateNotifSetts failed', e);
  }
};

export const updateNotificationToken = async () => {
  console.log('API updateNotificationToken ', `${HOST}${NOTIF_TOKEN}`);
  const currentNotToken = storage.getString('notToken');

  try {
    const token = await AsyncStorage.getItem('token');
    const notToken = await messaging().getToken();

    if (currentNotToken === null && !!notToken) {
      storage.setString('notToken', notToken);
    }

    return fetch(`${HOST}${NOTIF_TOKEN}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({
        notificationToken: notToken,
      }),
    });
  } catch (e) {
    console.log('API updateNotificationToken failed', e);
  }
};

export const deleteUserAccount = async (successCb, errorCb) => {
  console.log('API deleteUserAccount ', `${HOST}${DELETE_ACCOUNT}`);

  try {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${HOST}${DELETE_ACCOUNT}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
    })
      .then(async res => {
        const response = await res.json();

        if (response?.error) {
          !!errorCb && errorCb();
          return;
        }

        !!successCb && successCb();
      })
      .catch(() => {
        !!errorCb && errorCb();
      });
  } catch (e) {
    !!errorCb && errorCb();
    console.log('API deleteUserAccount failed', e);
  }
};
