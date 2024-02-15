import React from 'react';
import {Keyboard} from 'react-native';

import {isAndroid} from '../utils/GenericUtils';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    if (isAndroid) {
      return () => {};
    }

    function onKeyboardWillHide() {
      setKeyboardHeight(0);
    }

    function onKeyboardWillShow(e) {
      setKeyboardHeight(e.endCoordinates.height);
    }

    const showWillSubscription = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardWillShow,
    );

    const hideSubscription = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardWillHide,
    );

    return () => {
      hideSubscription.remove();
      showWillSubscription.remove();
    };
  }, []);

  return keyboardHeight;
};
