/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {DimensionsUtils} from '../../utils/DimensionUtils';

const CircularTransition = ({posX, posY, inCircleColor, outCircleColor}) => {
  const navigation = useNavigation();
  const scaleRef = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (posX > 0 && posY > 0) {
      Animated.timing(scaleRef, {
        toValue: 80,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate('GamesStack', {
          screen: 'Games',
          params: {
            backTransition: () =>
              Animated.timing(scaleRef, {
                toValue: 0,
                duration: 850,
                useNativeDriver: true,
              }).start(),
          },
        });
      });
    }
  }, [posX, posY, scaleRef]);

  return (
    <>
      <Animated.View
        style={{
          zIndex: 10000,
          position: 'absolute',
          top: posY - DimensionsUtils.getDP(24),
          left: posX - DimensionsUtils.getDP(24),
          backgroundColor: outCircleColor,
          width: DimensionsUtils.getDP(42),
          height: DimensionsUtils.getDP(42),
          borderRadius: DimensionsUtils.getDP(24),
          transform: [{scale: scaleRef}],
        }}
      />
      <Animated.View
        style={{
          zIndex: 10001,
          position: 'absolute',
          top: posY - DimensionsUtils.getDP(14),
          left: posX - DimensionsUtils.getDP(14),
          backgroundColor: inCircleColor,
          width: DimensionsUtils.getDP(28),
          height: DimensionsUtils.getDP(28),
          borderRadius: DimensionsUtils.getDP(14),
          transform: [{scale: scaleRef}],
        }}
      />
    </>
  );
};

export default CircularTransition;
