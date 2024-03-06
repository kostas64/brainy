import {
  statusCodes,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {storage} from '../../index';
import {requestAccess} from './user';
import SetNicknameModal from '../components/nickname/SetNicknameModal';

export const signInGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    return {
      logged: true,
      user: userInfo,
    };
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('user cancelled the login flow');
      return {
        logged: false,
        user: null,
      };
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('operation (e.g. sign in) is in progress already');
      return {
        logged: false,
        user: null,
      };
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('play services not available or outdated');
      return {
        logged: false,
        user: null,
      };
    } else {
      // some other error happened
      console.log('some other error happened', error);
      return {
        logged: false,
        user: null,
      };
    }
  }
};

export const signIn = async (
  setToken,
  setUser,
  setLoading,
  setModalInfo,
  successCb,
  closeModal,
) => {
  try {
    setLoading(true);
    const {logged, user} = await signInGoogle();

    if (logged && user) {
      const res = await requestAccess(user);
      const data = await res.json();

      if (data?.user?.notificationToken) {
        storage.setString('notToken', data?.user?.notificationToken);
      }

      storage.getBool('firstTime', async (_, result) => {
        if (result === null && !data?.user?.nickname) {
          storage.setBool('firstTime', false);

          setModalInfo({
            height: 200,
            onBackPress: () => setLoading(false),
            content: (
              <SetNicknameModal
                token={data?.token}
                successCb={() => {
                  closeModal();

                  setTimeout(() => {
                    setDataForLogin(data, setToken, setUser);
                    !!successCb && successCb();
                    setLoading(false);
                  }, 500);
                }}
              />
            ),
          });
        } else {
          setDataForLogin(data, setToken, setUser);
          !!successCb && successCb();
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  } catch (e) {
    console.log('Error on signIn ', e);
  }
};

export const signOut = async (setToken, setUser, withDelay = false) => {
  await GoogleSignin.signOut();
  setToken(null);

  if (withDelay) {
    setTimeout(() => {
      setUser(old => ({
        email: null,
        avatar: old?.avatar,
        isGuest: null,
        name: null,
        surname: null,
        nickname: null,
      }));
    }, 500);
  } else {
    setUser(old => ({
      email: null,
      avatar: old?.avatar,
      isGuest: null,
      name: null,
      surname: null,
      nickname: null,
    }));
  }

  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('email');
  await AsyncStorage.removeItem('avatar');
  await AsyncStorage.removeItem('name');
  await AsyncStorage.removeItem('surname');
  await AsyncStorage.removeItem('nickname');

  storage.setArray('scores', []);
};

const setDataForLogin = async (data, setToken, setUser) => {
  setToken(data?.token);
  setUser(old => ({
    ...old,
    email: data?.user?.email,
    avatar: data?.user?.avatar,
    isGuest: false,
    name: data?.user?.name,
    surname: data?.user?.surname,
  }));

  await AsyncStorage.setItem('token', data?.token);
  await AsyncStorage.setItem('email', data?.user?.email);
  await AsyncStorage.setItem('avatar', data?.user?.avatar);
  await AsyncStorage.setItem('name', data?.user?.name);
  await AsyncStorage.setItem('surname', data?.user?.surname);
};
