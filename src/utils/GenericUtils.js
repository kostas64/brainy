import {Dimensions, Platform} from 'react-native';

const {height: HEIGHT} = Dimensions.get('window');
export class GenericUtils {
  static adaptLayout = (small, big) => {
    return HEIGHT <= 720 ? small : big;
  };

  static isIos = () => Platform.OS === 'ios';
}
