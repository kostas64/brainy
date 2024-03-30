import {Dimensions, Platform} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {
  BEST_OF,
  EQUAL_MATH,
  GESTURE_IT,
  COLOR_CARDS,
  MATCH_CARDS,
  BALL_BALANCE,
} from '../Endpoints';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const HEIGHT_SCR = Dimensions.get('screen').height;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isTiramisuAndHigher = isAndroid && Platform.Version >= 33;

const haptikSettings = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export const triggerHaptik = () => {
  const type = isIOS ? 'impactHeavy' : 'impactMedium';
  ReactNativeHapticFeedback.trigger(type, haptikSettings);
};

export class GenericUtils {
  static adaptLayout = (small, big) => {
    return HEIGHT <= 720 ? small : big;
  };

  static getEndpoint = game =>
    game === 'Memory Cards'
      ? MATCH_CARDS
      : game === 'Color Match'
      ? COLOR_CARDS
      : game === 'Do the math'
      ? EQUAL_MATH
      : game === 'Gesture It'
      ? GESTURE_IT
      : game === 'Ball Balance'
      ? BALL_BALANCE
      : game === 'Best Of'
      ? BEST_OF
      : null;
}

export const onNavigationReady = () => {
  RNBootSplash.hide({fade: true, duration: 300});
};
