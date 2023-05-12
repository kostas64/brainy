import {
  statusCodes,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = async (setToken, setName) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    setToken(userInfo?.idToken);
    setName(userInfo?.user.name);
    await AsyncStorage.setItem('token', userInfo?.idToken);
    await AsyncStorage.setItem('name', userInfo?.user.name);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('user cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('operation (e.g. sign in) is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('play services not available or outdated');
    } else {
      // some other error happened
      console.log('some other error happened', error);
    }
  }
};
