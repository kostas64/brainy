import {
  BEST_OF,
  EQUAL_MATH,
  GESTURE_IT,
  COLOR_CARDS,
  MATCH_CARDS,
} from '../Endpoints';
import {Dimensions, Platform} from 'react-native';

const {height: HEIGHT} = Dimensions.get('window');
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
}
