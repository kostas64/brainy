import AsyncStorage from '@react-native-async-storage/async-storage';

import {BEARER, HOST, SHARE_IDEA} from '../Endpoints';

export const shareIdea = async idea => {
  console.log('API shareIdea ', `${HOST}${SHARE_IDEA}`, idea);

  try {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');

    return fetch(`${HOST}${SHARE_IDEA}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${BEARER}${token}`,
      },
      body: JSON.stringify({email, idea}),
    });
  } catch (e) {
    console.log('API shareIdea failed', e);
  }
};
