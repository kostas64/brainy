import React from 'react';
import {BackHandler} from 'react-native';

import {isIOS} from '../utils/GenericUtils';

const useBackAction = callback => {
  //** ----- EFFECTS -----
  React.useEffect(() => {
    if (isIOS) {
      return;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      callback,
    );

    return () => backHandler.remove();
  }, [callback]);
};

export default useBackAction;
