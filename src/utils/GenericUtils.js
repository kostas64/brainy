import {Dimensions, Platform} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import {
  BEST_OF,
  EQUAL_MATH,
  GESTURE_IT,
  COLOR_CARDS,
  MATCH_CARDS,
} from '../Endpoints';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
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
      : game === 'Best Of'
      ? BEST_OF
      : null;

  static isIos = () => Platform.OS === 'ios';

  static onNavigationReady = () => {
    RNBootSplash.hide({fade: true, duration: 300});
  };
}
