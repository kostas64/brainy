import React from 'react';
import {AppState} from 'react-native';

export const useAppState = (callback, stateUpdate = true) => {
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current,
  );

  React.useEffect(() => {
    const onChange = newState => {
      if (
        appState.current.match(/inactive|background/) &&
        newState === 'active'
      ) {
        !!callback && callback();
      }

      appState.current = newState;
      stateUpdate && setAppStateVisible(appState.current);
    };

    const subscription = AppState.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, [stateUpdate, callback]);

  return appStateVisible;
};
