import {Platform} from 'react-native';

export class GenericUtils {
  static fontFamily = () => {
    const isIOS = Platform.OS === 'ios';
    return isIOS ? 'Dilo World' : 'DiloWorld';
  };
}
