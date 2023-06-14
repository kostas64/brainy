import {Dimensions, Platform} from 'react-native';
import {COLOR_CARDS, MATCH_CARDS, EQUAL_MATH, GESTURE_IT} from '../Endpoints';

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
      : null;

  static isIos = () => Platform.OS === 'ios';
}
