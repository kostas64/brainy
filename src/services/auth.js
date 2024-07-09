import {
  statusCodes,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {appleAuth} from '@invertase/react-native-apple-authentication';

import {storage} from '../../index';
import {isAndroid} from '../utils/GenericUtils';
import {logoutUser, requestAccess} from './user';

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
  successCb,
  setIsNewUser,
) => {
  try {
    setLoading(true);

    const {logged, user} =
      isAndroid || __DEV__ ? await loginWithGoogle() : await loginWithApple();

    if (logged && user) {
      const res = await requestAccess(user);
      const data = await res.json();

      if (data?.user?.notificationToken) {
        storage.setString('notToken', data?.user?.notificationToken);
      }

      storage.getBool('firstTime', async (_, result) => {
        if (result === null && !data?.user?.nickname) {
          storage.setBool('firstTime', false);
          setIsNewUser(true);
          setDataForLogin(data, setToken, setUser);
          !!successCb && successCb();
          setLoading(false);
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

  logoutUser();
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

  if (data?.token) {
    await AsyncStorage.setItem('token', data?.token);
  }

  if (data?.user?.email) {
    await AsyncStorage.setItem('email', data?.user?.email);
  }

  if (typeof data?.user?.avatar === 'number') {
    await AsyncStorage.setItem('avatar', `${data?.user?.avatar}`);
  }

  if (data?.user?.name) {
    await AsyncStorage.setItem('name', data?.user?.name);
  }

  if (data?.user?.surname) {
    await AsyncStorage.setItem('surname', data?.user?.surname);
  }
};

const loginWithGoogle = async () => {
  const {logged, user} = await signInGoogle();

  return {
    logged,
    user,
  };
};

const loginWithApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      return {
        logged: true,
        user: {
          idToken: appleAuthRequestResponse.identityToken,
          user: {
            email: appleAuthRequestResponse.email,
            givenName: appleAuthRequestResponse.fullName?.givenName,
            familyName: appleAuthRequestResponse.fullName?.familyName,
          },
        },
      };
    }
  } catch (e) {
    return {
      logged: false,
      user: null,
    };
  }
};
