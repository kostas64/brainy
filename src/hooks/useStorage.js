import {useMMKVStorage} from 'react-native-mmkv-storage';

import {storage} from '../..';

export const useStorage = (key, defaultValue) => {
  const [value, setValue] = useMMKVStorage(key, storage, defaultValue);
  return [value, setValue];
};
