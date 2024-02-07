import {Dimensions, Platform} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import {
  BEST_OF,
  EQUAL_MATH,
  GESTURE_IT,
  COLOR_CARDS,
  MATCH_CARDS,
} from '../Endpoints';
import images from '../assets/images/images';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

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

  static onNavigationReady = () => {
    RNBootSplash.hide({fade: true, duration: 300});
  };

  static matchGameNameWithImg = game => {
    switch (game) {
      case 'Memory Cards':
        return images.memoryMatch;
      case 'Color Match':
        return images.colorMatch;
      case 'Do the math':
        return images.matchEqual;
      case 'Gesture It':
        return images.gestureIt;
    }
  };
}
