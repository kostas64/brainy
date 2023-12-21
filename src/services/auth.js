import {
  statusCodes,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {requestAccess} from './user';

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

export const signIn = async (setToken, setUser, setLoading) => {
  try {
    setLoading(true);
    const {logged, user} = await signInGoogle();

    if (logged && user) {
      const res = await requestAccess(user);
      const data = await res.json();

      setToken(data?.token);
      setUser({
        email: data?.user?.email,
        avatar: data?.user?.avatar,
        isGuest: false,
      });
      await AsyncStorage.setItem('token', data?.token);
      await AsyncStorage.setItem('email', data?.user?.email);
      await AsyncStorage.setItem('avatar', data?.user?.avatar);
    }

    setLoading(false);
    return logged;
  } catch (e) {
    console.log('Error on signIn ', e);
    return false;
  }
};

export const signOut = async (setToken, setUser) => {
  await GoogleSignin.signOut();
  setToken(null);
  setUser(old => ({
    email: null,
    avatar: old?.avatar,
    isGuest: null,
  }));
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('email');
  await AsyncStorage.removeItem('avatar');
};
