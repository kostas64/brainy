/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Lottie from 'lottie-react-native';

import {HEIGHT, WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

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
