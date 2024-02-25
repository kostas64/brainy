import React from 'react';
import {Keyboard} from 'react-native';

import {isAndroid} from '../utils/GenericUtils';

export const useKeyboard = (considerAndroid = false) => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    if (!considerAndroid && isAndroid) {
      return () => {};
    }

    function onKeyboardWillHide() {
      setKeyboardHeight(0);
    }

    function onKeyboardWillShow(e) {
      setKeyboardHeight(e.endCoordinates.height);
    }

    const showDidSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardWillShow,
    );

    const didHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardWillHide,
    );

    const showWillSubscription = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardWillShow,
    );

    const hideSubscription = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardWillHide,
    );

    return () => {
      !!hideSubscription && hideSubscription.remove();
      !!didHideSubscription && didHideSubscription.remove();
      !!showDidSubscription && showDidSubscription.remove();
      !!showWillSubscription && showWillSubscription.remove();
    };
  }, [considerAndroid]);

  return keyboardHeight;
};
