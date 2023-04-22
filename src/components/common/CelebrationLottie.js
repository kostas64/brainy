import React from 'react';
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const CelebrationLottie = React.forwardRef(({}, ref) => {
  return (
    <Lottie
      ref={ref}
      source={require('../../assets/lottie/confeti.json')}
      style={{
        position: 'absolute',
        top: DimensionsUtils.getDP(
          (HEIGHT - (3 * WIDTH) / 4 - (3 * WIDTH) / 16 - WIDTH + 25) / 2,
        ),
        left: 0,
        width: WIDTH,
        height: HEIGHT / 2,
        zIndex: 100,
      }}
      resizeMode="center"
    />
  );
});

export default CelebrationLottie;
